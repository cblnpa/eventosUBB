import { Component, OnInit } from '@angular/core';

import { EventoService } from '../../../servicios/servicio.index';
import { evento } from '../../../model/evento';

@Component({
  selector: 'app-eventos-detalles',
  templateUrl: './eventos-detalles.component.html',
  styleUrls: ['./eventos-detalles.component.css'],
  providers: [EventoService]
})
export class EventosDetallesComponent implements OnInit {

  eventos: any = [];

  constructor( private eventoService: EventoService) { }

  ngOnInit(): void {
    // this.eventoService.getEventos().subscribe((res:any[]) => {
    //   this.eventoService.eventos = res;
    //   console.log('dentro del console, debería mostrarme el res: ' + res + ' acá termina el res');
    // },
    // err => console.log(err))
  }

}
