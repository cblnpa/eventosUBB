import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { global } from '../../../servicios/global';
import { EventoPojoService, EventoUsersService, UserService, EventoService, ComisionService, RepositorioService, ModalService } from '../../../servicios/servicio.index';
import { evento_users, asistencia, deleteComision } from '../../../model/model.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-detalles',
  templateUrl: './eventos-detalles.component.html',
  styleUrls: ['./eventos-detalles.component.css']
})
export class EventosDetallesComponent implements OnInit {

  public url;
  public participantes;
  public idPersona;
  public comisiones; //almacenar los integrantes
  public repositorio;

  //verificar el usuario activo
  public token;
  public identity;
  public rol; //almacena el rol del usuario activo

  public idEvento: number; /* este es el id del evento para el eventousers */
  public status;

  public eventoUsers: evento_users;

  //arreglos que almacenan los objetos
  public arrActividades = [];
  public arrColaboradores = [];
  public arrJornadas = [];
  public arrExpositores = [];
  public evento;
  public fechas = []; //almacena todas las fechas del evento
  public fechaEvento; //almacena la fecha inicial del evento 

  public deleteC: deleteComision; //modelo para enviar los id del integrante de la comisión a eliminar
  public asistencia: asistencia; //modelo que posee evento_idEvento & users_id *se ocupa para el request

  constructor(private eventoPojoService: EventoPojoService, private eventoUsersService: EventoUsersService,
    private userService: UserService, private eventoService: EventoService, private route: ActivatedRoute,
    private router: Router, private comisionService: ComisionService, private repositorioService: RepositorioService,
    private modalService: ModalService) {
    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
    this.asistencia = new asistencia(null, null);
    this.deleteC = new deleteComision(null, null);
    this.repositorioService.getGeneralEmitter().subscribe(e => {
      this.mostrarRepositorio();
    })
  }

  ngOnInit() {
    this.getIdEvento();
    this.getEventosDetalle();
    this.getEventoUsers();
    this.getRol();
    this.getComision();
    this.mostrarRepositorio();
  }

  getIdEvento() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.idEvento = id;
    })
  }

  //Obtener el rol del usuario
  getRol() {
    this.eventoUsersService.getUsuarios(this.idEvento, this.identity.sub).subscribe(
      response => {
        this.rol = response.evento[0].rol_idRol;
      },
      error => {
        console.log(<any>error);
      })
  }

  getEventosDetalle() {
    Swal.showLoading();
    this.route.params.subscribe(params => {
      let idEvento = +params['id'];
      this.idEvento = idEvento;
      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(
        response => {
          console.log(response);
          if (response.code == 200) {
            //Almacenar las actividades
            if (response.actividad.length > 0) {
              for (var i = 0; i < response.actividad.length; i++) {
                if (response.actividad[i] != null)
                  this.arrActividades.push(response.actividad[i]);
              }
            }
            //Almacenar los colaboradores
            if (response.colaborador.length > 0) {
              for (var i = 0; i < response.colaborador.length; i++) {
                if (response.colaborador[i] != null)
                  this.arrColaboradores.push(response.colaborador[i]);
              }
            }
            //Almacenar jornadas
            var primeraFecha = '';
            if (response.Jornada.length > 0) {
              for (var i = 0; i < response.Jornada.length; i++) {
                if (response.Jornada[i] != null) {
                  this.arrJornadas.push(response.Jornada[i]);
                  this.fechas.push(response.Jornada[i].fechaJornada);
                }
              }
            }
            //Almacenar expositores
            if (response.expositor.length > 0) {
              for (var i = 0; i < response.expositor.length; i++) {
                if (response.expositor[i] != null)
                  this.arrExpositores.push(response.expositor[i]);
              }
            }
            //Seleccionar la fecha más pronta de las jornadas
            for (var i = 0; i < this.fechas.length; i++) {
              if (primeraFecha < this.fechas[i])
                this.fechaEvento = this.fechas[i];
            }
            //Datos básicos del evento
            this.evento = response.evento;
            Swal.close();
          }
        },
        error => {
          console.log(error);
        })
    })
  }

  //Obtener los participantes del evento 
  getEventoUsers() {
    this.eventoUsersService.getEventoUsersById(this.idEvento).subscribe(
      response => {
        this.participantes = response.evento;
        this.idPersona = this.participantes.users_id;
      },
      error => {
        console.log(<any>error);
      })
  }

  editarEvento(id: number) {
    this.eventoUsersService.getEventoUsersById(this.idEvento).subscribe(
      response => {
        this.router.navigate(['/eventosEditar/' + this.idEvento + '/' + this.identity.sub]);
        console.log(response);
      })
  }

  // Función para eliminar el evento 
  eliminarEvento(id) {
    Swal.fire({
      title: '¿Quiere eliminar esta evento?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar evento',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.eventoService.deleteEvento(this.token, id).subscribe(
          response => {
            console.log(response);
            console.log('Has eliminado un evento');
            this.router.navigate(['/inicio']);
          },
          error => {
            console.log(<any>error);
          })
      }
    })

  }

  //Debo mandar el id del usuario e id del evento 
  acreditar(idUsuario, idEvento) {
    this.asistencia = new asistencia(idEvento, idUsuario);
    this.eventoPojoService.asistenciaUsuarios(this.asistencia).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      })
  }

  //Obtener integrantes de la comisión
  getComision() {
    this.comisionService.getComisiones(this.idEvento).subscribe(
      response => {
        console.log(this.idEvento);
        console.log(response);
        this.comisiones = response.comisiones;
        console.log(this.comisiones);
      },
      error => {
        console.log(<any>error);
      })
  }

  //Eliminar comisión, el parámetro es el id del usuario a eliminar
  eliminarComision(id) {
    this.deleteC.evento_idEvento = this.idEvento;
    this.deleteC.users_id = id;

    Swal.fire({
      title: '¿Está seguro que desea eliminar este integrante de la comisión?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03C303',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.comisionService.deleteComision(this.deleteC).subscribe(
          response => {
            if (response.code == 200) {
              Swal.fire(
                '¡Eliminado!',
                'El integrante ha sido eliminado',
                'success')
              this.getComision();
            }
          },
          error => {
            console.log(<any>error);
          })
      }
    })
  }

  //Obtener los archivos del repositorio 
  mostrarRepositorio() {
    this.repositorioService.getRepositorios(this.idEvento).subscribe(
      response => {
        this.repositorio = response.repositorio;
        console.log(this.repositorio);
      },
      error => {
        console.log(<any>error);
      })
  }

  agregarRepositorioModal() {
    this.modalService.mostrarModal();
    this.repositorioService.getGeneralEmitter().subscribe(e => {
      this.mostrarRepositorio();
    })
  }

  //eliminar el repositorio
  deleteFile(id) {
    console.log(id);
    Swal.fire({
      title: '¿Está seguro que desea eliminar este archivo?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03C303',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.repositorioService.deleteRepositorio(id).subscribe(
          response => {
            console.log(response);
            // if (response.code == 200) {
            //   Swal.fire(
            //     '¡Eliminado!',
            //     'El repositorio ha sido eliminado',
            //     'success')
            //   this.mostrarRepositorio();
            // }
          },
          error => {
            console.log(<any>error);
          })
      }
    })
  }

  agregarComision() {
    this.router.navigate(['/crearComision']);
  }

  //descargar el archivo, se le pasa el nombre del que se quiere descargar 
  downloadFile(archivo) {
    // window.open('http://localhost:8000/api/downloadRepositorio/' + archivo, '_blank');
    window.open('http://parra.chillan.ubiobio.cl:8090/~gaston.lara1401/eventosUBB-laravel/storage/app/repositorio/' + archivo, '_blank');
  }

}
