import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoPojoService, EventoUsersService, UserService, MaterialService } from '../../../servicios/servicio.index';
import { global } from '../../../servicios/global';
import { evento_users } from '../../../model/model.index';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import '../icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-detalles-public',
  templateUrl: './eventos-detalles-public.component.html',
  styleUrls: ['./eventos-detalles-public.component.css']
})
export class EventosDetallesPublicComponent implements OnInit {

  fbIcon = faFacebookSquare;

  public url: string;
  public urlCompartir;
  public identity;

  public idEventoUsers: number; //id del evento
  public idUsuario;
  public showParticipar; //indica si muestra el botón participar según el usuario activo
  public participando; //1 indica que está participando
  public sinCupos = 0; //si es igual a 1, indica que no quedan cupos
  public fechas = []; //almacena todas las fechas del evento
  public fechaEvento; //almacena la fecha inicial del evento 

  // atributos para mostrar participantes
  public contadorEvento: number; //contador de cantidad de participantes (para la tabla evento_user)
  public cupos: number = 0; //tiene los cupos del evento
  public totalCupos; //tiene el total de cupos del evento
  public eventoUsers: evento_users;

  //arreglos que almacenan los objetos
  public arrActividades = [];
  public arrColaboradores = [];
  public arrJornadas = [];
  public arrExpositores = [];
  public arrMateriales = [];
  public evento;

  constructor(private userService: UserService, private eventoPojoService: EventoPojoService,
    private eventoUsersService: EventoUsersService, private route: ActivatedRoute,
    private materialService: MaterialService) {
    this.url = global.url;
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    this.getEventosDetalle();
    this.getEventoUsers();
    this.getIdUsuario();
    this.getAllUsers();
  }

  getIdUsuario() {
    if (!this.identity.id)
      this.idUsuario = this.identity.sub;
    else
      this.idUsuario = this.identity.id;
  }

  getEventosDetalle() {
    this.route.params.subscribe(params => {
      let idEvento = +params['id'];
      this.idEventoUsers = idEvento;
      //crear la url para los botones de compartir
      this.urlCompartir = `http://parra.chillan.ubiobio.cl:8090/~gaston.lara1401/eventosUBB/#/eventoDetallePublic/${this.idEventoUsers}`;
      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(
        response => {
          console.log(response);
          if (response.code == 200) {
            //Almacenar las actividades
            if (response.actividad.length > 0) {
              //&& primeraHora < response.actividad[i].horaInicioActividad
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
            //Almacenar los materiales
            if (response.material.length > 0) {
              for (var i = 0; i < response.material.length; i++) {
                if (response.material[i] != null)
                  this.arrMateriales.push(response.material[i]);
              }
            }
            //Seleccionar la fecha más pronta de las jornadas
            for (var i = 0; i < this.fechas.length; i++) {
              if (primeraFecha < this.fechas[i])
                this.fechaEvento = this.fechas[i];
            }
            //Datos básicos del evento
            this.evento = response.evento;
            this.totalCupos = response.evento.capacidad;
            console.log(this.fechaEvento);
          }
        },
        error => {
          console.log(error);
        })
    })
  }

  //Obtiene todos los usuarios del evento y revisa el rol para bloquear el botón de participar 
  getAllUsers() {
    this.eventoUsersService.getAllUsuariosByEvent(this.idEventoUsers).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          for (var i = 0; i < response.evento.length; i++) {
            if (response.evento[i].users.id == this.idUsuario) {
              //se asigna a showParticipar el rol del usuario activo
              this.showParticipar = response.evento[i].rol_idRol;
            }
            //se cuentan los cupos actuales que posee el evento
            if (response.evento[i].rol_idRol == 2)
              this.cupos++;
          }
        }
      },
      error => {
        console.log(<any>error);
      })
  }

  //Obtiene sólo los participantes de la tabla EventoUsers 
  getEventoUsers() {
    this.eventoUsersService.getEventoUsersById(this.idEventoUsers).subscribe(
      response => {
        this.contadorEvento = (response.evento).length + 1;
        this.eventoUsers = new evento_users(this.contadorEvento, null, this.idEventoUsers, null, this.identity.sub);
      },
      error => {
        console.log(<any>error);
      })
  }

  participarEvento() {
    if (this.cupos < this.totalCupos) {
      this.eventoUsersService.guardarEventoUser(this.eventoUsers, this.idUsuario).subscribe(
        response => {
          if (response.code == 200) {
            Swal.fire({
              type: 'success',
              title: '¡Inscrito correctamente en este evento!'
            })
          }
          if (response.code == 400)
            // response 400 indica que ya está participando en el evento
            this.participando = 1;
        }
      )
    } else {
      console.log('no quedan cupos');
      this.sinCupos = 1;
    }
  }

  descargarMaterial(archivo) {
    // window.open('http://localhost:8000/api/downloadMaterial/'+archivo,'_blank' );
    window.open('http://parra.chillan.ubiobio.cl:8090/~gaston.lara1401/eventosUBB-laravel/storage/app/material/' + archivo, '_blank');
  }

}
