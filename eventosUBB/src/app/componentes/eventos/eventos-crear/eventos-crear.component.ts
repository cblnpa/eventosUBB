import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoPojoService, UserService } from '../../../servicios/servicio.index';
import { eventoPojo } from '../../../model/model.index';
import {global} from '../../../servicios/global'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-crear',
  templateUrl: './eventos-crear.component.html',
  styleUrls: ['./eventos-crear.component.css'],
  providers: [ EventoPojoService, UserService ]
})
export class EventosCrearComponent implements OnInit {

  public url;

  public idUsuario; 
  public identity;

  public evento: eventoPojo;

  constructor( private userService: UserService, private eventoPojoService: EventoPojoService, 
    private router: Router ) {
      this.url = global.url;
      this.identity = this.userService.getIdentity();
      this.idUsuario = this.identity.sub;
      this.evento = new eventoPojo('','','','','',null,'',null,'','','','',null,'','','','',null,null,null,'','','','','','','','','',null,null,'','','');
     }

  ngOnInit() {
  }

  guardarEvento(form){

    this.eventoPojoService.guardarEventoPojo(this.idUsuario, this.evento).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          type: 'success',
          title: '¡Registro exitoso!'
        });
        this.router.navigate(['/inicio']);
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}
