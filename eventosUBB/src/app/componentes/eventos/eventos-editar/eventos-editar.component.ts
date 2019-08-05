import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute, Params } from '@angular/router';
import {global} from '../../../servicios/global'
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

import { eventoPojo, ciudad, evento, jornada, actividad, colaborador, expositor, material } from '../../../model/model.index';
import { EventoPojoService, CiudadService, UserService, EventoService, JornadaService, 
  ExpositorService, ActividadService, ModalService, MaterialService, ColaboradorService } from '../../../servicios/servicio.index';

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
  
  isLinear: false;

  public identity;
  public url;
  public token;
  public ciudades;
  public status;
  public id; //id del evento
  public idUsuario; //id del usuario (sub) 

  public contModal: number; 

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.jpeg,.png,.gif",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'upload',
      headers: {
        "Authorization": this.userService.getToken()
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
    private expositorService: ExpositorService, private modalService: ModalService,
    private eventoService: EventoService, private actividadService: ActividadService,
    private materialService: MaterialService, private colaboradorService: ColaboradorService ) {
      
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
    this.mostrarExpositores();
    this.mostrarActividades();
    this.mostrarMateriales();
    this.mostrarColaboradores();
    
    this.idUsuario = this.identity.sub;

    //Stepper 1 del evento 
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
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
    this.route.params.subscribe(
      params => {
        let idEvento = +params['id'];
        this.id = idEvento; //asignar el id del evento a la variable 
        this.eventoService.getEventoById(idEvento).subscribe(
          response => {
            this.eventos = response.evento;
            //Mostrar los datos del evento en el stepper 
            this.eventos = new evento(
              this.eventos.nombreEvento,
              this.eventos.ubicacion,
              this.eventos.direccion,
              this.eventos.detalles,
              this.eventos.imagen,
              this.eventos.capacidad,
              this.eventos.nombreEventoInterno,
              this.eventos.ciudad_idCiudad,
              this.eventos.visibilidad)
          },
          error => {
            console.log(<any>error);
          })
      })
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
          } }
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
      })
  }

  agregarJornadaModal(){
    this.contModal = 1;
    this.modalService.mostrarModal();
  }

  mostrarExpositores(){
    this.expositorService.getExpositoresActividad(this.id).subscribe(
      response => {
        this.expositor = response.expositor;
      },
      error => {
        console.log(<any>error);
      })
  }

  agregarExpositorModal(){
    this.contModal = 2;
    this.modalService.mostrarModal();
  }

  mostrarActividades(){
    this.actividadService.getActividades(this.id).subscribe(
      response => {
        this.actividad = response.actividades;
      },
      error => {
        console.log(<any>error);
      })
  }

  agregarActividadModal(){
    this.contModal = 3;
    this.modalService.mostrarModal();
  }

  mostrarMateriales(){
    this.materialService.getMateriales(this.id).subscribe(
      response => {
        this.material = response.material;
      },
      error => {
        console.log(<any>error);
      })
  }

  agregarMaterialModal(){
    this.contModal = 4;
    this.modalService.mostrarModal();
  }

  mostrarColaboradores(){
    this.colaboradorService.getColaboradores(this.id).subscribe(
      response => {
        this.colaborador = response.colaborador;
      },
      error => {
        console.log(<any>error);
      })
  }

  agregarColaboradorModal(){
    this.contModal = 5;
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

}
