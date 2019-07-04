import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../servicios/global';

import { EventoPojoService } from '../../../servicios/servicio.index';
import { evento, material, colaborador, jornada, expositor, actividad } from '../../../model/model.index';

@Component({
  selector: 'app-eventos-detalles',
  templateUrl: './eventos-detalles.component.html',
  styleUrls: ['./eventos-detalles.component.css'],
  providers: [ EventoPojoService ]
})
export class EventosDetallesComponent implements OnInit {

  public url: string;
  public id: number;

  public actividad: actividad;
  public evento: evento;
  public material: material;
  public colaborador: colaborador;
  public jornada: jornada;
  public expositor: expositor;

  constructor( private eventoPojoService: EventoPojoService, private route: ActivatedRoute, 
    private router: Router ) { 

    this.url = global.url;

  }

  ngOnInit(): void {
    this.getEventosDetalle();
  }

  getEventosDetalle(){
    this.route.params.subscribe( params => {

      let idEvento = +params['id'];

      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(

        response => {
          if(response.status == 'success'){
            console.log('response !!!!!');
            console.log(response);

            this.jornada = response.Jornada;
            console.log('JORNADA !!');
            console.log(this.jornada);

            this.actividad = response.actividad;
            console.log('ACTIVIDAD !!');
            console.log(this.actividad);

            this.expositor = response.expositor;
            console.log('EXPOSITOR!!');
            console.log(this.expositor);

            this.colaborador = response.colaborador;
            console.log('COLABORADORES !!');
            console.log(this.colaborador);

            this.evento = response.evento;
            console.log('EVENTO !!');
            console.log(this.evento);

            this.material = response.material;
            console.log('MATERIAL !!');
            console.log(this.material);



          } else {
            this.router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
        }   
      )
    })
  }

}
