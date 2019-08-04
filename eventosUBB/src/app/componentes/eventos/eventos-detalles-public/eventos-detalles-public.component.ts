import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../servicios/global';

import { EventoPojoService, EventoUsersService, UserService } from '../../../servicios/servicio.index';
import { evento, material, colaborador, jornada, expositor, actividad, users, evento_users } from '../../../model/model.index';

import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import '../icons';

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

  public idEventoUsers: number;
  // atributos para mostrar participantes
  public participantes: users;
  public index: number; //contador de cantidad de personas
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
            this.colaborador = response.colaborador;
            this.evento = response.evento;
            this.expositor = response.expositor;
            this.jornada = response.Joranda;
            this.material = response.material;
          } else {
            this.router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
        })
    })
  }

  getEventoUsers() {
    this.eventoUsersService.getEventoUsersById(this.identity.sub).subscribe(
      response => {
        this.participantes = response.evento;
        this.index = (response.evento).length;
        this.eventoUsers = new evento_users(null, null, 2, this.identity.sub);
        this.eventoUsers = new evento_users(this.index, this.identity.sub, null, this.identity.sub);
      },
      error => {
        console.log(<any>error);
      })
  }

  participarEvento() {

    this.eventoUsersService.guardarEventoUser(this.eventoUsers, this.identity.sub).subscribe(
      response => {
        console.log('dentro del servicio');
        console.log(response);
        // if( response.status == 'success'){
        //   console.log(response);
        //   console.log('inscripcion');
        //   // Swal.fire({
        //   //   type: 'success',
        //   //   title: '¡Te has inscrito correctamente en este evento!'
        //   // })
        //   this.inscrito = true;
        // } else {
        //   // Swal.fire({
        //   //   type: 'warning',
        //   //   title: '¡Ya estás inscrito en este evento!'
        //   // })
        // }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
