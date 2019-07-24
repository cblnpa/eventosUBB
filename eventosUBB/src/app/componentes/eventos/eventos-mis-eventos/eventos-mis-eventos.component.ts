import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { global } from '../../../servicios/global';

import { EventoUsersService, UserService, EventoPojoService } from '../../../servicios/servicio.index';

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

  public misEventos; // guarda los eventos en los que participa el usuario
  public misEventosAdmin; //  guarda los eventos que administra el usuario admin

  public perfil; // id del perfil del usuario activo

  constructor( private eventoUsersService: EventoUsersService,  private userService: UserService, 
    private eventoPojoService: EventoPojoService, private route: ActivatedRoute, private router: Router ) {

    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();

  }

  ngOnInit() {

    this.getMisEventos();
    this.getMisEventosAdmin();

    this.perfil = this.identity.perfil_idPerfil;
    console.log('dentro del ng on init');
    console.log(this.perfil);
    console.log(this.identity);
    console.log('el token del ng on init');
    console.log(this.token);

  }

  getMisEventos(){

    this.eventoUsersService.getMisEventos(this.token).subscribe(
      response => {
        console.log('dentro del mis eventos');
        console.log(response);
        this.misEventos = response.eventos;
      },
      error => {
        console.log(<any>error);
      }
    )

  }

  getMisEventosAdmin(){

    this.eventoUsersService.getMisEventosAdmin(this.token).subscribe(
      response => {
        this.misEventosAdmin = response.eventos;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
