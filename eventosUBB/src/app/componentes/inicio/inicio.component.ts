import { Component, OnInit } from '@angular/core';
import { EventoService, EventoPojoService } from '../../servicios/servicio.index';
import {global} from '../../servicios/global'

import { evento } from '../../model/evento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ EventoService, EventoPojoService ]
})
export class InicioComponent implements OnInit {

  public url;
  public eventos;
  public id; 

  constructor( private eventoService: EventoService, private eventoPojoService: EventoPojoService,
    private router: Router ) { 
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

  eventosDetalles(idEvento: number){
    this.router.navigate(['/eventoDetalle/' + idEvento]);
  }


}
