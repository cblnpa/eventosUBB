import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { global } from '../../servicios/global';
import { EventoPojoService, EventoUsersService, UserService, EventoService, ComisionService, RepositorioService, ModalService } from '../../servicios/servicio.index';
import { evento, material, colaborador, jornada, expositor, actividad, evento_users, asistencia, deleteComision } from '../../model/model.index';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css'],
  providers: [EventoPojoService, EventoUsersService, UserService, EventoService]

})
export class ProgramaComponent implements OnInit {
  public url: string; // url que posee el localhost.. 
  public participantes;
  public idPersona;
  public comisiones; //almacenar los integrantes
  public repositorio; 

  //verificar el usuario activo
  public token;
  public identity;
  public rol; //almacena el rol del usuario activo

  public idEventoUsers: number; /* este es el id del evento para el eventousers */
  public status;

  public eventoUsers: evento_users;

  public actividad: actividad;
  public evento: evento;
  public material: material;
  public colaborador: colaborador;
  public jornada: jornada;
  public expositor: expositor;
 
  constructor(private eventoPojoService: EventoPojoService, private eventoUsersService: EventoUsersService,
    private userService: UserService, private eventoService: EventoService, private route: ActivatedRoute,
    private router: Router, private comisionService: ComisionService, private repositorioService: RepositorioService,
    private modalService: ModalService ) {
    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
    
  }



  ngOnInit() {
    this.getEventosDetalle();

  }

  getEventosDetalle() {
    this.route.params.subscribe(params => {

      let idEvento = +params['id'];
      this.idEventoUsers = idEvento;

      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(

        response => {
          if (response.status == 'success') {

            if (response.Jornada == null) {
            } else {
              this.jornada = response.Jornada;
            }
            if (response.actividad == null) {
            } else {
              this.actividad = response.actividad;
            }
            if (response.expositor == null) {
            } else {
              this.expositor = response.expositor;
            }
            if (response.colaborador == null) {
            } else {
              this.colaborador = response.colaborador;
            }
            if (response.evento == null) {
            } else {
              this.evento = response.evento;
            }
            if (response.material == null) {
            } else {
              this.material = response.material;
            }
          } else {
            this.router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
        })})
  }

}
