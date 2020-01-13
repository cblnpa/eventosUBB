import { Component, OnInit } from '@angular/core';
import { EventoService, EventoPojoService } from '../../servicios/servicio.index';
import {global} from '../../servicios/global'
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
  public eventos1;


  constructor( private eventoService: EventoService, private router: Router ) { 
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
          this.eventos1 = response.eventos;

        }
      },
      error => {
        console.log(error);
      }
    );
  }
  buscarEvento(termino:string){
    let eventoArr:any = [];
    
if(termino.length!=0){
  termino = termino.toLowerCase();
  for(let event of this.eventos1){
    let nombre = event.nombreEvento.toLowerCase();
    if (nombre.indexOf(termino)>=0 ){
      eventoArr.push(event)
      console.log("if" + termino.length);
    }
  }
}else {
          this.eventos = this.eventos1;
          console.log("else" + termino.length);

          return this.eventos;
        }
      
   
    this.eventos = eventoArr;
    console.log(this.eventos);
  }

  eventosDetalles(idEvento: number){
    this.router.navigate(['/eventoDetallePublic/' + idEvento]);
  }


}
