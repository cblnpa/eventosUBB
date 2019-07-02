import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../servicios/servicio.index';
import {global} from '../../servicios/global'

import { evento } from '../../model/evento';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ EventoService ]
})
export class InicioComponent implements OnInit {
  public url;
  public eventos;

  constructor( private eventoService: EventoService ) { 
    this.url = global.url;
  }

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
