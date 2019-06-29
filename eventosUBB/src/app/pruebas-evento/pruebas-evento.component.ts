import { Component, OnInit } from '@angular/core';

import { EventoPojoService } from '../servicios/servicio.index';
import { eventoPojo } from '../model/eventoPojo';

declare function init_plugins();

@Component({
  selector: 'app-pruebas-evento',
  templateUrl: './pruebas-evento.component.html',
  styleUrls: ['./pruebas-evento.component.css'],
  providers: [ EventoPojoService ]
})
export class PruebasEventoComponent implements OnInit {

  public eventoPojo: eventoPojo;


  constructor( private eventoPojoService: EventoPojoService ) { 
    this.eventoPojo = new eventoPojo('','','','','',null,'',null,'','','','',null,'','','','',null,null,null,'','','','','','','','','',null,null,'','');
  }

  ngOnInit() {
    init_plugins();
  }

  onSubmit(form){

    this.eventoPojoService.guardarEventoPojo(this.eventoPojo).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )

  }

}
