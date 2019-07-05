import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { global } from '../../../servicios/global';

import { EventoUsersService, UserService, EventoPojoService } from '../../../servicios/servicio.index';
import { evento, evento_users, users } from '../../../model/model.index';


@Component({
  selector: 'app-eventos-mis-eventos',
  templateUrl: './eventos-mis-eventos.component.html',
  styleUrls: ['./eventos-mis-eventos.component.css'],
  providers: [ EventoUsersService, UserService, EventoPojoService ]
})
export class EventosMisEventosComponent implements OnInit {

  public url: string;

  public token;
  public identity;

  public idEvento: number;

  public misEventos: evento;

  constructor( private eventoUsersService: EventoUsersService,  private userService: UserService, 
    private eventoPojoService: EventoPojoService, private route: ActivatedRoute, private router: Router ) {

    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();

  }

  ngOnInit() {
    this.getMisEventos();
  }

  getMisEventos(){

    this.eventoUsersService.getMisEventos(this.token).subscribe(
      response => {
        this.misEventos = response.eventos;
      },
      error => {
        console.log(<any>error);
      }
    )

    
  }

  /*
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

  */

}
