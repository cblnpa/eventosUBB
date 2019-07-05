import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../servicios/global';

import { EventoPojoService, EventoUsersService, UserService } from '../../../servicios/servicio.index';
import { evento, material, colaborador, jornada, expositor, actividad, evento_users } from '../../../model/model.index';

@Component({
  selector: 'app-eventos-detalles',
  templateUrl: './eventos-detalles.component.html',
  styleUrls: ['./eventos-detalles.component.css'],
  providers: [ EventoPojoService, EventoUsersService, UserService ]
})
export class EventosDetallesComponent implements OnInit {

  public url: string;
  public id: number;

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

  constructor( private eventoPojoService: EventoPojoService, private eventoUsersService: EventoUsersService,
    private userService: UserService, private route: ActivatedRoute, private router: Router ) { 

    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();

  }

  ngOnInit(): void {
    this.getEventosDetalle();
    this.eventoUsers = new evento_users(null,this.idEventoUsers,null,this.identity.sub);
  }

  getEventosDetalle(){
    this.route.params.subscribe( params => {

      let idEvento = +params['id'];
      this.idEventoUsers = idEvento;
      
      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(

        response => {
          if(response.status == 'success'){
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

  participarEvento(){

    this.eventoUsersService.participarEvento(this.token, this.eventoUsers, this.idEventoUsers).subscribe(
      response => {
        console.log(response);
        console.log('identity:');
        console.log(this.identity);
        console.log('id');
        console.log(this.idEventoUsers);
      },
      error => {

      }
    )

    }

}
