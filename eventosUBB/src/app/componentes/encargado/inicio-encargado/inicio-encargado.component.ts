import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../servicios/backend/evento/evento.service';

import { evento } from '../../../model/evento';

@Component({
  selector: 'app-inicio-encargado',
  templateUrl: './inicio-encargado.component.html',
  styleUrls: ['./inicio-encargado.component.css'],
  providers: [ EventoService ]
})
export class InicioEncargadoComponent implements OnInit {

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
