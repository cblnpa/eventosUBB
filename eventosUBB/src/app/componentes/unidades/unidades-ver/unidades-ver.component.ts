import { Component, OnInit } from '@angular/core';
import { global } from '../../../servicios/global'
import { UnidadService } from '../../../servicios/servicio.index';

@Component({
  selector: 'app-unidades-ver',
  templateUrl: './unidades-ver.component.html',
  styleUrls: ['./unidades-ver.component.css'],
  providers: [ UnidadService ]
})
export class UnidadesVerComponent implements OnInit {

  public url;
  public unidades;

  constructor( private unidadService: UnidadService ) { 
    this.url = global.url;
  }

  ngOnInit() {
    this.getUnidades();
  }

  getUnidades(){
    this.unidadService.getUnidades().subscribe(
      response => {
        console.log('unidades!!');
        console.log(response);
        this.unidades = response.unidades;
      },
      error => {
        console.log(<any>error);
      })
  }

}
