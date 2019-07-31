import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  public url: string;
  public id: number;
  public esteEvento;
  public idEsteEvento;
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
  }

  getEventosDetalle() {
    this.route.params.subscribe(params => {

      let idEvento = +params['id'];
      this.idEventoUsers = idEvento;

      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(

        response => {
          if (response.status == 'success') {
            this.jornada = response.Jornada;
            this.actividad = response.actividad;
            this.expositor = response.expositor;
            this.colaborador = response.colaborador;
            this.evento = response.evento;
            this.material = response.material;

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
        console.log('participantes');
        console.log(this.participantes);
        
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

        this.esteEvento = response.evento;
        console.log(this.esteEvento);

        this.idEsteEvento = this.esteEvento[0].users_id;

        if (this.idEsteEvento != this.identity.sub) {
          Swal.fire({
            type: 'warning',
            title: '¡Este evento no es tuyo!'
          })
        } else {
          this.router.navigate(['/eventosEditar/' + this.idEventoUsers + '/' + this.identity.sub]);
        }

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

}
