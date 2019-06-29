import { Component, OnInit } from '@angular/core';

import { EventoPojoService, CiudadService } from '../servicios/servicio.index';


import { evento } from '../model/evento';
import { colaborador } from '../model/colaborador';
import { jornada } from '../model/jornada';
import { expositor } from '../model/expositor';
import { material } from '../model/material';
import { actividad } from '../model/actividad';
import { ciudad } from '../model/ciudad';

declare function init_plugins();

@Component({
  selector: 'app-pruebas-evento',
  templateUrl: './pruebas-evento.component.html',
  styleUrls: ['./pruebas-evento.component.css'],
  providers: [ EventoPojoService, CiudadService ]
})
export class PruebasEventoComponent implements OnInit {

  public evento: evento;
  public jornada: jornada;
  public actividad: actividad;
  public expositor: expositor;
  public colaborador: colaborador;
  public material: material;
  public ciudad: Array<ciudad>;


  constructor( private eventoPojoService: EventoPojoService, private ciudadService: CiudadService ) { 
    this.evento = new evento('','','','','',null,null);
    this.jornada = new jornada('',null,null,null,'','');
    this.actividad = new actividad('',null,null,'','');
    this.expositor = new expositor('','','','','','');
    this.colaborador = new colaborador('','',null,'','','',);
    this.material = new material('',null,'');
    // this.ciudad = new ciudad(null,'');
  }

  ngOnInit() {
    init_plugins();
    this.getCiudad();
  }

  getCiudad(){
    this.ciudadService.getCiudades().subscribe(
      response => {
        if(response.status == 'success'){
          this.ciudad = [];
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(form){

    this.eventoPojoService.guardarEventoPojo(evento,material,colaborador,jornada,expositor,actividad).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )

  }

  onSubmit2(form2){

    // this.colaboradorService.guardarColaborador(this.colaborador).subscribe(
    //   response => {
    //     console.log(response);
    //     form2.reset();
    //   },
    //   error => {
    //     console.log(<any>error);
    //   }
    // );

  }

}
