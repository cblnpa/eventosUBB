import { Component, OnInit } from '@angular/core';

import { evento } from '../model/evento';
import { colaborador } from '../model/colaborador';

import { EventoService, ColaboradorService } from '../servicios/servicio.index';

declare function init_plugins();

@Component({
  selector: 'app-pruebas-evento',
  templateUrl: './pruebas-evento.component.html',
  styleUrls: ['./pruebas-evento.component.css'],
  providers: [ EventoService, ColaboradorService ]
})
export class PruebasEventoComponent implements OnInit {

  public evento: evento; 
  public colaborador: colaborador;
  public eventos;

  public contadorId;

  constructor( private eventoService: EventoService,
    private colaboradorService: ColaboradorService ) { 
    //crear un objeto vacío, el formulario se va a encargar de guardar esto en el back
    this.evento = new evento('','','','','',null);

    //crear un colaborador vacío
    this.colaborador = new colaborador('','',null,'','','',null);

    this.contadorId = 0; 

  }

  ngOnInit() {
    init_plugins();
    this.getEventos();
    this.getIdEvento();
    console.log('inicio console log valor del contadorId: ');
    console.log(this.getIdEvento());
    console.log(' fin console log');
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

  getIdEvento(){
    
    return this.contadorId;
  }

  onSubmit(form){

    this.eventoService.guardarEvento(this.evento).subscribe(
      response => {
        console.log(response);
        // form.reset();
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  onSubmit2(form2){

    this.colaboradorService.guardarColaborador(this.colaborador).subscribe(
      response => {
        console.log(response);
        form2.reset();
      },
      error => {
        console.log(<any>error);
      }
    );

  }

}
