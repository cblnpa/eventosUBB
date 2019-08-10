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
  public sub; // pruebas para el login con google el sub es el id del usuario

  constructor( private eventoUsersService: EventoUsersService,  private userService: UserService, 
    private router: Router ) {

    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();

  }

  ngOnInit() {
    this.perfil = this.identity.perfil_idPerfil;
    this.sub = this.identity.sub;
  
    this.getMisEventos();
    this.getMisEventosAdmin();
    this.getUsuarios();
  }

  //Obtener los eventos en los que el usuario participa 
  getMisEventos(){
    this.eventoUsersService.getMisEventos(this.sub).subscribe(
      response => {  
        this.misEventos = response.eventos;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Obtener los eventos que el usuario administra
  getMisEventosAdmin(){
    this.eventoUsersService.getMisEventosAdmin(this.sub).subscribe(
      response => {
          this.misEventosAdmin = response.eventos;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getUsuarios(){
    this.eventoUsersService.getEventoUsersById(this.idEvento).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  //Redirección a la vista administrativa del evento
  eventosDetalles(idEvento: number){
    this.router.navigate(['/eventoDetalle/' + idEvento]);
  }

  //Redirección a la vista general del evento
  verEvento(idEvento: number){
    this.router.navigate(['/eventoDetallePublic/' + idEvento]);

  }

}
