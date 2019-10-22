import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoPojoService, EventoUsersService, UserService, MaterialService } from '../../../servicios/servicio.index';
import { global } from '../../../servicios/global';
import { users, evento_users } from '../../../model/model.index';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import '../icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-detalles-public',
  templateUrl: './eventos-detalles-public.component.html',
  styleUrls: ['./eventos-detalles-public.component.css']
})
export class EventosDetallesPublicComponent implements OnInit {

  fbIcon = faFacebookSquare;

  public url: string;
  public urlCompartir;
  public identity;

  public idEventoUsers: number; //id del evento
  public idUsuario;
  public showParticipar; //indica si muestra el botón participar según el usuario activo
  public participando; //1 indica que está participando

  // atributos para mostrar participantes
  public contadorEvento: number; //contador de cantidad de participantes (para la tabla evento_user)
  public cupos: number = 0; //tiene los cupos del evento
  public eventoUsers: evento_users;

  //arreglos que almacenan los objetos
  public arrActividades = [];
  public arrColaboradores = [];
  public arrJornadas = [];
  public arrExpositores = [];
  public arrMateriales = [];
  public evento;

  constructor(private userService: UserService, private eventoPojoService: EventoPojoService,
    private eventoUsersService: EventoUsersService, private route: ActivatedRoute,
    private materialService: MaterialService) {
    this.url = global.url;
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    this.getEventosDetalle();
    this.getEventoUsers();
    this.getIdUsuario();
    this.getAllUsers();
  }

  getIdUsuario() {
    if (!this.identity.id)
      this.idUsuario = this.identity.sub;
    else
      this.idUsuario = this.identity.id;
  }

  getEventosDetalle() {
    this.route.params.subscribe(params => {
      let idEvento = +params['id'];
      this.idEventoUsers = idEvento;
      //crear la url para los botones de compartir
      this.urlCompartir = `http://parra.chillan.ubiobio.cl:8090/~gaston.lara1401/eventosUBB/api/eventoDetallePublic/${this.idEventoUsers}`;
      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(
        response => {
          console.log(response);
          if (response.code == 200) {
            //Almacenar las actividades
            if (response.actividad.length > 0) {
              for (var i = 0; i < response.actividad.length; i++) {
                if (response.actividad[i] != null)
                  this.arrActividades.push(response.actividad[i]);
              }
            }
            //Almacenar los colaboradores
            if (response.colaborador.length > 0) {
              for (var i = 0; i < response.colaborador.length; i++) {
                if (response.colaborador[i] != null)
                  this.arrColaboradores.push(response.colaborador[i]);
              }
            }
            //Almacenar jornadas
            if (response.Jornada.length > 0) {
              for (var i = 0; i < response.Jornada.length; i++) {
                if (response.Jornada[i] != null)
                  this.arrJornadas.push(response.Jornada[i]);
              }
            }
            //Almacenar expositores
            if (response.expositor.length > 0) {
              for (var i = 0; i < response.expositor.length; i++) {
                if (response.expositor[i] != null)
                  this.arrExpositores.push(response.expositor[i]);
              }
            }
            //Almacenar los materiales
            if (response.material.length > 0) {
              for (var i = 0; i < response.material.length; i++) {
                if (response.material[i] != null)
                  this.arrMateriales.push(response.material[i]);
              }
            }
            //Datos básicos del evento
            this.evento = response.evento;
          }
        },
        error => {
          console.log(error);
        })
    })
  }

  //Obtiene todos los usuarios del evento y revisa el rol para bloquear el botón de participar 
  getAllUsers() {
    this.eventoUsersService.getAllUsuariosByEvent(this.idEventoUsers).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          for (var i = 0; i < response.evento.length; i++) {
            if (response.evento[i].users.id == this.idUsuario) {
              this.showParticipar = response.evento[i].rol_idRol;
              console.log(this.showParticipar);
            }
            if (response.evento[i].rol_idRol == 2) {
              this.cupos++;
              console.log(this.cupos);
            }
          }
        }
      },
      error => {
        console.log(<any>error);
      })
  }

  //Obtiene sólo los participantes de la tabla EventoUsers 
  getEventoUsers() {
    this.eventoUsersService.getEventoUsersById(this.idEventoUsers).subscribe(
      response => {
        this.contadorEvento = (response.evento).length + 1;
        this.eventoUsers = new evento_users(this.contadorEvento, null, this.idEventoUsers, null, this.identity.sub);
      },
      error => {
        console.log(<any>error);
      })
  }

  participarEvento(capacidad) {
    if(capacidad == this.cupos ){
      
    } else {
    this.eventoUsersService.guardarEventoUser(this.eventoUsers, this.idUsuario).subscribe(
      response => {
        if (response.code == 200) {
          Swal.fire({
            type: 'success',
            title: '¡Inscrito correctamente en este evento!'
          })
        }
        if (response.code == 400) {
          this.participando = 1;
        }
      },
      error => {
        console.log(<any>error);
      }
    )}
  }

  descargarMaterial(archivo) {
    console.log('estoy en descargar !!');
    console.log(archivo);
    this.materialService.downloadMaterial(archivo).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
