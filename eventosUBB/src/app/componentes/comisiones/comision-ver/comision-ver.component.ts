import { Component, OnInit } from '@angular/core';
import { global } from '../../../servicios/global'
import { Router } from '@angular/router';
import { EventoUsersService, UserService } from '../../../servicios/servicio.index';

@Component({
  selector: 'app-comision-ver',
  templateUrl: './comision-ver.component.html',
  styleUrls: ['./comision-ver.component.css']
})
export class ComisionVerComponent implements OnInit {

  public url;
  public eventos;

  public token;
  public identity;

  constructor( private eventoUsersService: EventoUsersService, private userService: UserService, 
    private router: Router ) {
    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  ngOnInit() {
    this.getMisEventosAdmin();
  }

  getMisEventosAdmin(){
    this.eventoUsersService.getMisEventosAdmin(this.identity.id).subscribe(
      response => {
        console.log(response);
          this.eventos = response.eventos;
      },
      error => {
        console.log(<any>error);
      })
  }

  //Redirección a la vista administrativa del evento
  eventosDetalles(idEvento: number){
    this.router.navigate(['/eventoDetalle/' + idEvento]);
  }

}
