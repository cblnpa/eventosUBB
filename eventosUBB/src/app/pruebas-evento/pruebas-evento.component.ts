import { Component, OnInit } from '@angular/core';

import { evento } from '../model/evento';

import { EventoService } from '../servicios/backend/evento/evento.service';

declare function init_plugins();

@Component({
  selector: 'app-pruebas-evento',
  templateUrl: './pruebas-evento.component.html',
  styleUrls: ['./pruebas-evento.component.css'],
  providers: [ EventoService ]
})
export class PruebasEventoComponent implements OnInit {
  

  public evento: evento; 

  constructor( private eventoService: EventoService ) { 
    //crear un objeto vacío, el formulario se va a encargar de guardar esto en el back
    this.evento = new evento('','','','','',null);
  }

  ngOnInit() {
    init_plugins();
  }

  onSubmit(form){

    this.eventoService.guardarEvento(this.evento).subscribe(
      response => {
        console.log(response);
        form.reset();
      },
      error => {
        console.log(<any>error);
      }
    );

  }

}
