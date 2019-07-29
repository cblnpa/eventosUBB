import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute, Params } from '@angular/router';
import {global} from '../../../servicios/global'
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

import { eventoPojo, ciudad, evento, jornada, actividad, colaborador, expositor, material } from '../../../model/model.index';
import { EventoPojoService, CiudadService, UserService } from '../../../servicios/servicio.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-editar',
  templateUrl: './eventos-editar.component.html',
  styleUrls: ['./eventos-editar.component.css'],
  providers: [ CiudadService, EventoPojoService, UserService ,{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class EventosEditarComponent implements OnInit {

  public eventoPojo: eventoPojo;
  public ciudad: ciudad;
  public eventos: evento;
  public jornada: jornada;
  public actividad: actividad;
  public colaborador: colaborador;
  public expositor: expositor;
  
  firstFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  isLinear: false;

  public identity;
  public url;
  public token;
  public ciudades;
  public status;
  public id; 

  public idUsuario; //id del usuario (sub) 

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.jpeg,.png,.gif",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'upload',
      headers: {
     "Authorization" : this.userService.getToken()
      }
    },
     theme: "attachPin",
     hideProgressBar: false,
     hideResetBtn: true,
     hideSelectBtn: false,
     replaceTexts: {
      attachPinBtn: 'Seleccionar archivo',
      afterUploadMsg_success: 'Archivo seleccionado exitosamente'
    }
  };

  constructor( private _formBuilder: FormBuilder, private userService: UserService,
    private eventoPojoService: EventoPojoService, private router: Router, private route: ActivatedRoute,
    private ciudadService: CiudadService ) {

      this.eventoPojo = new eventoPojo('','','','','',null,'',null,'','','','',null,'','','','',null,null,null,'','','','','','','','','',null,null,'','','');
      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();
      this.url = global.url;

  }

  ngOnInit() {

    this.getCiudades();
    this.getDatosEvento();
    
    this.idUsuario = this.identity.sub;
    

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });

    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });

    this.sixthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });

  }

  getCiudades(){
    this.ciudadService.getCiudades().subscribe(
      response => {
        if( response.status == 'success' ){
          this.ciudades = response.ciudad;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getDatosEvento(){

    this.route.params.subscribe( params => {
      let idEventoPojo = +params['id'];
      this.id = idEventoPojo;
      
      this.eventoPojoService.getEventoPojoById(idEventoPojo).subscribe(
        response => {
          console.log('response del getDatosEventos');
          console.log(response);
          this.jornada = response.Jornada;
          this.actividad = response.actividad;
          this.colaborador = response.colaborador;
          this.eventos = response.evento; 
          this.expositor = response.expositor;

          //mostrar los datos del objeto EventoPojo que se consulta
          this.eventoPojo = new eventoPojo (
            this.eventos.nombreEvento,
            this.eventos.ubicacion,
            this.eventos.direccion,
            this.eventos.detalles,
            this.eventos.imagen,
            this.eventos.capacidad,
            this.eventos.nombreEventoInterno,
            this.eventos.ciudad_idCiudad,

            this.eventoPojo.nombreMaterial,
            this.eventoPojo.archivo,

            this.colaborador.nombreColaborador,
            this.colaborador.nombreRepresentante,
            this.colaborador.telefonoColaborador,
            this.colaborador.correoColaborador,
            this.colaborador.sitioWeb,
            this.colaborador.logo,

            this.jornada.nombreJornada,
            this.jornada.fechaJornada,
            this.jornada.horaInicioJornada,
            this.jornada.horaFinJornada,
            this.jornada.ubicacionJornada,
            this.jornada.descripcionJornada,

            this.expositor.nombreExpositor,
            this.expositor.apellidoExpositor,
            this.expositor.sexo,
            this.expositor.correoExpositor,
            this.expositor.empresa,
            this.expositor.foto,

            this.actividad.nombreActividad,
            this.actividad.horaInicioActividad,
            this.actividad.horaFinActividad,
            this.actividad.ubicacionActividad,
            this.actividad.descripcionActividad,

            this.eventoPojo.email
          )
        }
      )
    });

  }

  guardarEvento(form){

    this.eventoPojoService.updateEventoPojo(this.eventoPojo, this.id, this.idUsuario).subscribe(
      response => {
        if(response && response.status){
          this.status = 'success';

          console.log('guardar Evnto');
          console.log(this.eventoPojo);

          //Actualizar los datos que se ingresaron
          if(response.changes.eventos.nombreEvento){
            this.eventoPojo.nombreEvento = response.changes.eventos.nombreEvento;
          }

          if(response.changes.eventos.ubicacion){
            this.eventoPojo.ubicacion = response.changes.eventos.ubicacion;
          }

          if(response.changes.eventos.direccion){
            this.eventoPojo.direccion = response.changes.eventos.direccion;
          }

          if(response.changes.eventos.detalles){
            this.eventoPojo.detalles = response.changes.eventos.detalles;
          }

          if(response.changes.eventos.imagen){
            this.eventoPojo.imagen = response.changes.eventos.imagen;
          }

          if(response.changes.eventos.capacidad){
            this.eventoPojo.capacidad = response.changes.eventos.capacidad;
          }

          if(response.changes.eventos.nombreEventoInterno){
            this.eventoPojo.nombreEventoInterno = response.changes.eventos.nombreEventoInterno;
          }

          if(response.changes.eventos.ciudad){
            this.eventoPojo.ciudad_idCiudad = response.changes.eventos.ciudad;
          }

          if(response.changes.colaborador.nombreColaborador){
            this.eventoPojo.nombreColaborador = response.changes.colaborador.nombreColaborador;
          }

          if(response.changes.colaborador.nombreRepresentante){
            this.eventoPojo.nombreRepresentante = response.changes.colaborador.nombreRepresentante;
          }

          if(response.changes.colaborador.telefonoColaborador){
            this.eventoPojo.telefonoColaborador = response.changes.colaborador.telefonoColaborador;
          }

          if(response.changes.colaborador.correoColaborador){
            this.eventoPojo.correoColaborador = response.changes.colaborador.correoColaborador;
          }

          if(response.changes.colaborador.sitioWeb){
            this.eventoPojo.sitioWeb = response.changes.colaborador.sitioWeb;
          }

          if(response.changes.colaborador.logo){
            this.eventoPojo.logo = response.changes.colaborador.logo;
          }

          if(response.changes.jornada.nombreJornada){
            this.eventoPojo.nombreJornada = response.changes.jornada.nombreJornada;
          }

          if(response.changes.jornada.fechaJornada){
            this.eventoPojo.fechaJornada = response.changes.jornada.fechaJornada;
          }

          if(response.changes.jornada.horaInicioJornada){
            this.eventoPojo.horaInicioJornada = response.changes.jornada.horaInicioJornada;
          }

          if(response.changes.jornada.horaFinJornada){
            this.eventoPojo.horaFinJornada = response.changes.jornada.horaFinJornada;
          }

          if(response.changes.jornada.ubicacionJornada){
            this.eventoPojo.ubicacionJornada = response.changes.jornada.ubicacionJornada;
          }

          if(response.changes.jornada.descripcionJornada){
            this.eventoPojo.descripcionJornada = response.changes.jornada.descripcionJornada;
          }

          if(response.changes.expositor.nombreExpositor){
            this.eventoPojo.nombreExpositor = response.changes.expositor.nombreExpositor;
          }

          if(response.changes.expositor.apellidoExpositor){
            this.eventoPojo.apellidoExpositor = response.changes.expositor.apellidoExpositor;
          }

          if(response.changes.expositor.nombreExpositor){
            this.eventoPojo.nombreExpositor = response.changes.expositor.nombreExpositor;
          }

          if(response.changes.expositor.sexo){
            this.eventoPojo.sexo = response.changes.expositor.sexo;
          }

          if(response.changes.expositor.correoExpositor){
            this.eventoPojo.correoExpositor = response.changes.expositor.correoExpositor;
          }

          if(response.changes.expositor.empresa){
            this.eventoPojo.empresa = response.changes.expositor.empresa;
          }

          if(response.changes.expositor.foto){
            this.eventoPojo.foto = response.changes.expositor.foto;
          }

          if(response.changes.expositor.nombreExpositor){
            this.eventoPojo.nombreExpositor = response.changes.expositor.nombreExpositor;
          }

          if(response.changes.actividad.nombreActividad){
            this.eventoPojo.nombreActividad = response.changes.actividad.nombreActividad;
          }

          if(response.changes.actividad.horaInicioActividad){
            this.eventoPojo.horaInicioActividad = response.changes.actividad.horaInicioActividad;
          }

          if(response.changes.actividad.horaFinActividad){
            this.eventoPojo.horaFinActividad = response.changes.actividad.horaFinActividad;
          }

          if(response.changes.actividad.ubicacionActividad){
            this.eventoPojo.ubicacionActividad = response.changes.actividad.ubicacionActividad;
          }

          if(response.changes.actividad.descripcionActividad){
            this.eventoPojo.descripcionActividad = response.changes.actividad.descripcionActividad;
          }
        }
        
      }
    )
    this.router.navigate(['/eventoDetalle/' + this.id]);
  }

  imagenUpload(datos){
    let data =JSON.parse(datos.response);
    console.log(datos.response);
    this.eventoPojo.imagen = data.image;
    console.log(this.eventoPojo.imagen);
  }

  logoUpload(datos){
    let data =JSON.parse(datos.response);
    console.log(datos.response);
    this.eventoPojo.logo = data.image;
    console.log(this.eventoPojo.logo);
  }

  fotoUpload(datos){
    let data =JSON.parse(datos.response);
    console.log(datos.response);
    this.eventoPojo.foto = data.image;
    console.log(this.eventoPojo.foto);
  }

}
