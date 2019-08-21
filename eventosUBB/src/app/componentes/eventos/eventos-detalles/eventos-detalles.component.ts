import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { global } from '../../../servicios/global';
import { EventoPojoService, EventoUsersService, UserService, EventoService, ComisionService, RepositorioService, ModalService } from '../../../servicios/servicio.index';
import { evento, material, colaborador, jornada, expositor, actividad, evento_users, asistencia } from '../../../model/model.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-detalles',
  templateUrl: './eventos-detalles.component.html',
  styleUrls: ['./eventos-detalles.component.css']
})
export class EventosDetallesComponent implements OnInit {

  public url: string; // url que posee el localhost.. 
  public participantes;
  public idPersona;
  public comisiones; //almacenar los integrantes
  public repositorio; 

  //verificar el usuario activo
  public token;
  public identity;
  public rol; //almacena el rol del usuario activo

  public idEventoUsers: number; /* este es el id del evento para el eventousers */
  public status;

  public eventoUsers: evento_users;
  public actividad: actividad;
  public evento: evento;
  public material: material;
  public colaborador: colaborador;
  public jornada: jornada;
  public expositor: expositor;
  public asistencia: asistencia; //modelo que posee evento_idEvento & users_id *se ocupa para el request

  constructor(private eventoPojoService: EventoPojoService, private eventoUsersService: EventoUsersService,
    private userService: UserService, private route: ActivatedRoute, private router: Router, 
    private comisionService: ComisionService, private repositorioService: RepositorioService,
    private modalService: ModalService ) {
    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
    this.asistencia = new asistencia(null, null);
  }

  ngOnInit(): void {
    this.getEventosDetalle();
    this.getEventoUsers();
    this.getRol();
    this.getComision();
    this.mostrarRepositorio();
    this.getFile();
  }

  getEventosDetalle() {
    this.route.params.subscribe(params => {

      let idEvento = +params['id'];
      this.idEventoUsers = idEvento;

      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(

        response => {
          if (response.status == 'success') {

            if (response.Jornada == null) {
            } else {
              this.jornada = response.Jornada;
            }
            if (response.actividad == null) {
            } else {
              this.actividad = response.actividad;
            }
            if (response.expositor == null) {
            } else {
              this.expositor = response.expositor;
            }
            if (response.colaborador == null) {
            } else {
              this.colaborador = response.colaborador;
            }
            if (response.evento == null) {
            } else {
              this.evento = response.evento;
            }
            if (response.material == null) {
            } else {
              this.material = response.material;
            }
          } else {
            this.router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
        })})
  }

  //Obtener los participantes del evento 
  getEventoUsers() {
    this.eventoUsersService.getEventoUsersById(this.idEventoUsers).subscribe(
      response => {
        this.participantes = response.evento;
        this.idPersona = this.participantes.users_id;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  editarEvento(id: number) {
    this.eventoUsersService.getEventoUsersById(this.idEventoUsers).subscribe(
      response => {
        this.router.navigate(['/eventosEditar/' + id + '/' + this.identity.id]);
        console.log(response);
      }
    )
  }

  // Función para eliminar el evento 
  eliminarEvento(id) {
    this.eventoUsersService.deleteEvento(this.token, id).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
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
      }
    )
  }

  //Obtener el rol del usuario
  getRol() {
    this.eventoUsersService.getUsuarios(this.idEventoUsers, this.identity.id).subscribe(
      response => {
        this.rol = response.evento[0].rol_idRol;
      },
      error => {
        console.log(<any>error);
      })
  }

  //Obtener integrantes de la comisión
  getComision() {
    this.comisionService.getComisiones(this.idEventoUsers).subscribe(
      response => {
        this.comisiones = response.comisiones;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Obtener los archivos del repositorio 
  mostrarRepositorio() {
    this.repositorioService.getRepositorios(this.idEventoUsers).subscribe(
      response => {
        this.repositorio = response.repositorio;
      },
      error => {
        console.log(<any>error);
      })
  }
  
  agregarRepositorioModal(){
    this.modalService.mostrarModal();
  }

  getFile(){
    this.eventoPojoService.getFile(this.evento.imagen).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //descargar el archivo, se le pasa el nombre del que se quiere descargar 
  downloadFile(archivo){
    console.log(archivo);
    this.repositorioService.downloadFile(archivo).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      })
  }

}
