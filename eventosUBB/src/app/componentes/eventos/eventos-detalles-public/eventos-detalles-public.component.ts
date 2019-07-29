import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../servicios/global';

import { EventoPojoService, EventoUsersService, UserService, EventoService } from '../../../servicios/servicio.index';
import { evento, material, colaborador, jornada, expositor, actividad, evento_users, users } from '../../../model/model.index';


@Component({
  selector: 'app-eventos-detalles-public',
  templateUrl: './eventos-detalles-public.component.html',
  styleUrls: ['./eventos-detalles-public.component.css'],
  providers: [ UserService, EventoPojoService ]
})
export class EventosDetallesPublicComponent implements OnInit {

  public url: string;
  public token;
  public identity;

  public idEventoUsers: number;

  public actividad: actividad;
  public evento: evento;
  public material: material;
  public colaborador: colaborador;
  public jornada: jornada;
  public expositor: expositor;


  constructor( private userService: UserService, private eventoPojoService: EventoPojoService,
    private route: ActivatedRoute, private router: Router ) { 
    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  ngOnInit() {
    this.getEventosDetalle();
  }

  getEventosDetalle(){
    this.route.params.subscribe( params => {

      let idEvento = +params['id'];
      this.idEventoUsers = idEvento;
      
      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(

        response => {
          if(response.status == 'success'){
            this.jornada = response.Jornada;
            this.actividad = response.actividad;
            this.expositor = response.expositor;
            this.colaborador = response.colaborador;
            this.evento = response.evento;
            this.material = response.material;

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
