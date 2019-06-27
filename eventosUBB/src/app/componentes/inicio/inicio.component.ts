import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../servicios/servicio.index';

import { evento } from '../../model/evento';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ EventoService ]
})
export class InicioComponent implements OnInit {

  public eventos;

  constructor( private eventoService: EventoService ) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.eventoService.getEventos().subscribe(
      response => {
        if(response.status == 'success'){
          this.eventos = response.eventos;
          console.log(this.eventos);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
