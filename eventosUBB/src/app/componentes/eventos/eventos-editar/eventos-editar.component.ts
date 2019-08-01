import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute, Params } from '@angular/router';
import {global} from '../../../servicios/global'
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

import { eventoPojo, ciudad, evento, jornada, actividad, colaborador, expositor, material } from '../../../model/model.index';
import { EventoPojoService, CiudadService, UserService, EventoService, JornadaService, ModalService } from '../../../servicios/servicio.index';

@Component({
  selector: 'app-eventos-editar',
  templateUrl: './eventos-editar.component.html',
  styleUrls: ['./eventos-editar.component.css'],
  providers: [ CiudadService, EventoPojoService, UserService ,{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class EventosEditarComponent implements OnInit {

  //Modelos y/o Tablas
  public eventoPojo: eventoPojo;
  public ciudad: ciudad;
  public material: material;
  public eventos: evento;
  public jornada: jornada;
  public actividad: actividad;
  public colaborador: colaborador;
  public expositor: expositor;
  
  //Formularios del stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
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
  public id; //id del evento
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

  constructor( private _formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, 
    private userService: UserService, private eventoPojoService: EventoPojoService,
    private ciudadService: CiudadService, private jornadaService: JornadaService, 
    private modalService: ModalService ) {
      
      //objeto para mostrar los datos ?
      this.eventoPojo = new eventoPojo('','','','','',null,'',null,'','','','',null,'','','','',null,null,null,'','','','','','','','','',null,null,'','','','');
      
      // objeto para editar el evento, step 1
      this.eventos = new evento('','','','','',null,'',null,null,null);

      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();
      this.url = global.url;

  }

  ngOnInit() {

    this.getCiudades();
    this.getDatosEvento();
    this.mostrarJornadas();
    
    this.idUsuario = this.identity.sub;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
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
          this.material = response.material;
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

            this.material.nombreMaterial,
            this.material.archivo,

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

            this.eventoPojo.visibilidad,
            this.eventoPojo.email
          )
        }
      )
    });

  }

  guardarEvento(form){
    this.eventoPojoService.updateEventoPojo(this.eventos, this.id).subscribe(
      response => {
  
        if(response && response.status){
          this.status = 'success';

          //Actualizar los datos que se ingresaron
          if(response.changes.eventos.nombreEvento){
            this.eventos.nombreEvento = response.changes.eventos.nombreEvento;
          }

          if(response.changes.eventos.ubicacion){
            this.eventos.ubicacion = response.changes.eventos.ubicacion;
          }

          if(response.changes.eventos.direccion){
            this.eventos.direccion = response.changes.eventos.direccion;
          }

          if(response.changes.eventos.detalles){
            this.eventos.detalles = response.changes.eventos.detalles;
          }

          if(response.changes.eventos.imagen){
            this.eventos.imagen = response.changes.eventos.imagen;
          }

          if(response.changes.eventos.capacidad){
            this.eventos.capacidad = response.changes.eventos.capacidad;
          }

          if(response.changes.eventos.nombreEventoInterno){
            this.eventos.nombreEventoInterno = response.changes.eventos.nombreEventoInterno;
          }

          if(response.changes.eventos.ciudad){
            this.eventos.ciudad_idCiudad = response.changes.eventos.ciudad;
          }
        }
      }
    )
    this.router.navigate(['/eventoDetalle/' + this.id]);
  }

  //Listar jornadas del evento en la tabla
  mostrarJornadas(){
    this.jornadaService.getJornadas(this.id).subscribe(
      response => {
        this.jornada = response.jornadas;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  agregarJornadaModal(){
    this.modalService.mostrarModal();
  }

  //foto del evento
  imagenUpload(datos){
    let data =JSON.parse(datos.response);
    console.log(datos.response);
    this.eventos.imagen = data.image;
    console.log(this.eventos.imagen);
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
