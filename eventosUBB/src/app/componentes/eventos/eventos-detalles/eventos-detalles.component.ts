import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../../servicios/global';

import { EventoPojoService, EventoUsersService, UserService } from '../../../servicios/servicio.index';
import { evento, material, colaborador, jornada, expositor, actividad, evento_users, users } from '../../../model/model.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-detalles',
  templateUrl: './eventos-detalles.component.html',
  styleUrls: ['./eventos-detalles.component.css'],
  providers: [ EventoPojoService, EventoUsersService, UserService ]
})
export class EventosDetallesComponent implements OnInit {

  public url: string;
  public id: number;
  public esteEvento;
  public idEsteEvento;

  public index: number; //contador de cantidad de personas

  public token;
  public identity;
  public idEventoUsers: number; /* este es el id del evento para el eventousers */
  public status;

  // atributos para mostrar participantes
  public participantes: users;

  public eventoUsers: evento_users;

  public actividad: actividad;
  public evento: evento;
  public material: material;
  public colaborador: colaborador;
  public jornada: jornada;
  public expositor: expositor;

  public idPerfil; //perfil del usuario que está activo

  public inscrito: boolean; //para ocultar el botón de Participar si es que ya está participando

  constructor( private eventoPojoService: EventoPojoService, private eventoUsersService: EventoUsersService,
    private userService: UserService, private route: ActivatedRoute, private router: Router ) { 

    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();

  }

  ngOnInit(): void {
    this.getEventosDetalle();
    this.getEventoUsers();
    this.idPerfil = this.identity.perfil_idPerfil; // para ocultar botones

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

  getEventoUsers(){
  
    this.eventoUsersService.getEventoUsersById(this.idEventoUsers).subscribe(
      response => {
        console.log(response);
        this.participantes = response.evento;
        console.log(this.participantes);

        this.index = (response.evento).length;
        console.log('get event');
        console.log(this.index);

        this.eventoUsers = new evento_users(this.index,this.idEventoUsers,null,this.identity.sub);
        console.log('dentro del coso, imprimir el model');
        console.log(this.eventoUsers);

      },
      error => {
        console.log(<any>error);
      }
    )
  }

  participarEvento(){

    this.eventoUsersService.guardarEventoUser(this.token, this.eventoUsers).subscribe(
      response => {
        if( response.status == 'success'){
          Swal.fire({
            type: 'success',
            title: '¡Te has inscrito correctamente en este evento!'
          })
          this.inscrito = true;
        } else {
          Swal.fire({
            type: 'warning',
            title: '¡Ya estás inscrito en este evento!'
          })
        }
        
      },
      error => {
        console.log(<any>error);
      }
    )

    }

    editarEvento(id: number){

      this.eventoUsersService.getEventoUsersById(this.idEventoUsers).subscribe(
        response => {
          console.log('dentro del editar evento');
          console.log(response);

          this.esteEvento = response.evento;
          console.log(this.esteEvento);

          this.idEsteEvento = this.esteEvento[0].users_id;

          if(this.idEsteEvento != this.identity.sub){
            Swal.fire({
              type: 'warning',
              title: '¡Este evento no es tuyo!'
            })
          } else {
            this.router.navigate(['/eventosEditar/' + this.idEventoUsers]);
          }

        }
      )

    }

    // Función para eliminar el evento 
    eliminarEvento(id){

      if(this.idEsteEvento == this.identity.sub){
        this.eventoUsersService.deleteEvento(this.token,id).subscribe(
          response => {
            console.log("has eliminado un evento");
            this.router.navigate(['/inicio']);
          },
          error => {
            console.log(<any>error);
          }
        )
      } else {
        Swal.fire({
          type: 'warning',
          title: '¡Este evento no es tuyo!'
        })
      }
      
    }

}
