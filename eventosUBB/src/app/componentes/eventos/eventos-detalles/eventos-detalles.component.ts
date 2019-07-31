import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { global } from '../../../servicios/global';

import { EventoPojoService, EventoUsersService, UserService, EventoService } from '../../../servicios/servicio.index';
import { evento, material, colaborador, jornada, expositor, actividad, evento_users, asistencia } from '../../../model/model.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-detalles',
  templateUrl: './eventos-detalles.component.html',
  styleUrls: ['./eventos-detalles.component.css'],
  providers: [EventoPojoService, EventoUsersService, UserService, EventoService]
})
export class EventosDetallesComponent implements OnInit {

  public url: string; // url que posee el localhost.. 
  public participantes;
  public idPersona;

  //verificar el usuario activo
  public token;
  public identity;

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
    private userService: UserService, private eventoService: EventoService, private route: ActivatedRoute, private router: Router) {
    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
    this.asistencia = new asistencia(null,null);

  }

  ngOnInit(): void {
    this.getEventosDetalle();
    this.getEventoUsers();
    //this.getFile();
  }

  getEventosDetalle() {
    console.log('eventos detalles');
    this.route.params.subscribe(params => {

      let idEvento = +params['id'];
      this.idEventoUsers = idEvento;

      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(

        response => {
          if (response.status == 'success') {

            if( response.Jornada == null ){
              console.log('dentro del if jornada');
            } else {
              this.jornada = response.Jornada;
              console.log('el jornada!!');
              console.log(this.jornada);
            }
            if( response.actividad == null ){
              console.log('dentro del if actividad');
            } else {
              this.actividad = response.actividad;
              console.log('actividad');
              console.log(this.actividad);
            }
            if( response.expositor == null ){
              console.log('dentro del if expositor');
            } else {
              this.expositor = response.expositor;
              console.log('expositor');
              console.log(this.expositor);
            }
            if( response.colaborador == null ){
              console.log('dentro del if colaborador');
            } else {
              this.colaborador = response.colaborador;
              console.log('colaborador');
              console.log(this.colaborador);
            }
            if( response.evento == null ){
              console.log('dentro del if evento');
            } else {
              this.evento = response.evento;
              console.log('evento');
              console.log(this.evento);
            }
            if( response.material == null ){
              console.log('dentro del if material');
            } else {
              this.material = response.material;
              console.log('material');
              console.log(this.material);
            }

            console.log('response');
            console.log(response);
            //this.jornada = response.Jornada;
            // console.log('jornada');
            // console.log(this.jornada);
            // this.actividad = response.actividad;
            // this.expositor = response.expositor;
            // this.colaborador = response.colaborador;
            // this.evento = response.evento;
            // this.material = response.material;

          } else {
            this.router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
        }
      )
    })
  }

  //Obtener los participantes del evento 
  getEventoUsers(){
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
        this.router.navigate(['/eventosEditar/' + this.idEventoUsers + '/' + this.identity.sub]);
        console.log(response);
      }
    )
  }

  // Función para eliminar el evento 
  eliminarEvento(id) {
    this.eventoUsersService.deleteEvento(this.token, id).subscribe(
      response => {
        console.log("has eliminado un evento de eventousers");
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Debo mandar el id del usuario e id del evento 
  acreditar(idUsuario, idEvento){
    this.asistencia = new asistencia(idEvento,idUsuario);
    this.eventoPojoService.asistenciaUsuarios(this.asistencia).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Obtener imagen
  // getFile(){
  //   this.eventoPojoService.getFile(this.evento.imagen).subscribe(
  //     response => {
  //       console.log('imagen evento');
  //       console.log(response);
  //     },
  //     error => {
  //       console.log(<any>error);
  //     }
  //   )
  // }

}
