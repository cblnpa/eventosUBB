import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../servicios/backend/evento/evento.service';
import { evento } from '../../../model/evento';

@Component({
  selector: 'app-inicio-encargado',
  templateUrl: './inicio-encargado.component.html',
  styleUrls: ['./inicio-encargado.component.css']
})
export class InicioEncargadoComponent implements OnInit {

  evento: any = {};

  constructor( private eventoService: EventoService ) { }

  ngOnInit() {
    // this.eventoService.getEventos().subscribe((resp:any[]) => {
    //   this.eventoService.eventos = resp;
    //   console.log('ahora viene el console log del evento service ');
    //   console.log(this.eventoService.eventos);
    // })
  }

}
