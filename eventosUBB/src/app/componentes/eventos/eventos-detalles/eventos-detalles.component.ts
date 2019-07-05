import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../servicios/global';

import { EventoPojoService, EventoUsersService, UserService } from '../../../servicios/servicio.index';
import { evento, material, colaborador, jornada, expositor, actividad, evento_users } from '../../../model/model.index';

@Component({
  selector: 'app-eventos-detalles',
  templateUrl: './eventos-detalles.component.html',
  styleUrls: ['./eventos-detalles.component.css'],
  providers: [ EventoPojoService, EventoUsersService, UserService ]
})
export class EventosDetallesComponent implements OnInit {

  public url: string;
  public id: number;

  public token;
  public idEventoUsers: number;

  public eventoUsers: evento_users;
  public actividad: actividad;
  public evento: evento;
  public material: material;
  public colaborador: colaborador;
  public jornada: jornada;
  public expositor: expositor;

  constructor( private eventoPojoService: EventoPojoService, private eventoUsersService: EventoUsersService,
    private userService: UserService, private route: ActivatedRoute, private router: Router ) { 

    this.url = global.url;
    this.token = this.userService.getToken();
    this.eventoUsers = new evento_users(null,this.idEventoUsers,null,this.token);

  }

  ngOnInit(): void {
    this.getEventosDetalle();
  }

  getEventosDetalle(){
    this.route.params.subscribe( params => {

      let idEvento = +params['id'];
      this.idEventoUsers = idEvento;
      
      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(

        response => {
          if(response.status == 'success'){
            // console.log('response !!!!!');
            // console.log(response);

            this.jornada = response.Jornada;
            // console.log('JORNADA !!');
            // console.log(this.jornada);

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

  participarEvento(){

    this.route.params.subscribe( params => {

      let idEvento = +params['id'];

      // this.eventoUsers = new evento_users(null,idEvento,null);
      // console.log('eventousers');
      // console.log(this.eventoUsers);

      this.eventoUsersService.guardarEventoUsers(this.token, this.eventoUsers).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(<any>error);
        }
      )

    })

  }

}
