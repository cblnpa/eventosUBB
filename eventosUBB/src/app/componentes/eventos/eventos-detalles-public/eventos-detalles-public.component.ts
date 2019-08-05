import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../servicios/global';

import { EventoPojoService, EventoUsersService, UserService } from '../../../servicios/servicio.index';
import { evento, material, colaborador, jornada, expositor, actividad, users, evento_users } from '../../../model/model.index';

import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import '../icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-detalles-public',
  templateUrl: './eventos-detalles-public.component.html',
  styleUrls: ['./eventos-detalles-public.component.css'],
  providers: [UserService, EventoPojoService, EventoUsersService]
})
export class EventosDetallesPublicComponent implements OnInit {

  fbIcon = faFacebookSquare;

  public url: string;
  public identity;
  public inscrito: boolean; //para ocultar el botón si ya está participando

  public idEventoUsers: number; //id del evento
  // atributos para mostrar participantes
  public participantes: users;
  public index: number; //contador de cantidad de participantes
  public eventoUsers: evento_users;

  public actividad: actividad;
  public evento: evento;
  public material: material;
  public colaborador: colaborador;
  public jornada: jornada;
  public expositor: expositor;

  constructor(private userService: UserService, private eventoPojoService: EventoPojoService,
    private eventoUsersService: EventoUsersService, private route: ActivatedRoute, private router: Router) {
    this.url = global.url;
    this.identity = this.userService.getIdentity();
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
          console.log('response con los datos del evento');
          console.log(response);
          if (response.status == 'success') {
            this.actividad = response.actividad;
            console.log('actividad');
            console.log(this.actividad);

            this.colaborador = response.colaborador;
            console.log('colaborador');
            console.log(this.colaborador);

            this.evento = response.evento;
            console.log('evento');
            console.log(this.evento);

            this.expositor = response.expositor;
            console.log('expositor');
            console.log(this.expositor);

            this.jornada = response.Jornada;
            console.log('jornada');
            console.log(this.jornada);

            this.material = response.material;
            console.log('material');
            console.log(this.material);

          } else {
            this.router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
        })
    })
  }

  //Obtiene los participantes de la tabla EventoUsers 
  getEventoUsers() {
    this.eventoUsersService.getEventoUsersById(this.idEventoUsers).subscribe(
      response => {
        this.participantes = response.evento;
        this.index = (response.evento).length + 1;

        console.log('get eventos');
        this.eventoUsers = new evento_users(this.index, null, this.idEventoUsers, null, this.identity.sub);
        console.log(this.eventoUsers);
      },
      error => {
        console.log(<any>error);
      })
  }

  participarEvento() {
    this.eventoUsersService.guardarEventoUser(this.eventoUsers, this.identity.sub).subscribe(
      response => {
        console.log(response);
        if( response.status == 'success' ){
          Swal.fire({
            type: 'success',
            title: '¡Inscrito correctamente en este evento!'
          })
          this.inscrito = true;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
