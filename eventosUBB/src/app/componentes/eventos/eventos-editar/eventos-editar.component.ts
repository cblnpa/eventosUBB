import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { global } from '../../../servicios/global'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { eventoPojo, ciudad, evento } from '../../../model/model.index';
import {
  EventoPojoService, CiudadService, UserService, EventoService, TipoEventoService, CategoriaService
} from '../../../servicios/servicio.index';

@Component({
  selector: 'app-eventos-editar',
  templateUrl: './eventos-editar.component.html',
  styleUrls: ['./eventos-editar.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class EventosEditarComponent implements OnInit {

  //Modelos y/o Tablas
  public eventoPojo: eventoPojo;
  public ciudad: ciudad;
  public eventos: evento;

  //Formularios del stepper
  firstFormGroup: FormGroup;
  isLinear: false;

  public identity;
  public url;
  public token;
  public ciudades;
  public categorias;
  public tipoEvento;
  public id; //id del evento
  public idUsuario; //id del usuario (sub) 
  public visibilidadEvento;

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

  constructor(private _formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private userService: UserService, private eventoPojoService: EventoPojoService,
    private ciudadService: CiudadService, private categoriaService: CategoriaService,
    private tipoEventoService: TipoEventoService, private eventoService: EventoService) {
    this.eventos = new evento('', '', '', '', '', null, '', null, null, null, null, null);
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    this.getDatosEvento();
    this.getCiudades();
    this.getCategorias();
    this.getTipoEventos();
    this.idUsuario = this.identity.sub;
    //Stepper 1 del evento 
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  getCiudades() {
    this.ciudadService.getCiudades().subscribe(
      response => {
        if (response.status == 'success') {
          this.ciudades = response.ciudad;
        }
      },
      error => {
        console.log(error);
      });
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(
      response => {
        if (response.status == 'success') {
          this.categorias = response.categoria;
        }
      },
      error => {
        console.log(error);
      });
  }

  getTipoEventos() {
    this.tipoEventoService.getTiposEventos().subscribe(
      response => {
        if (response.status == 'success') {
          this.tipoEvento = response.tipoEvento;
        }
      },
      error => {
        console.log(error);
      })
  }

  getDatosEvento() {
    this.route.params.subscribe(
      params => {
        let idEvento = +params['id'];
        this.id = idEvento; //asignar el id del evento a la variable 
        this.eventoService.getEventoById(idEvento).subscribe(
          response => {
            console.log(response);
            this.eventos = response.evento;
            //Mostrar los datos del evento en el stepper 
            this.eventos = new evento(this.eventos.nombreEvento, this.eventos.ubicacion, this.eventos.direccion,
              this.eventos.detalles, this.eventos.imagen, this.eventos.capacidad, this.eventos.nombreEventoInterno,
              this.eventos.ciudad_idCiudad, this.eventos.categoria_idCategoria, this.eventos.visibilidad,
              this.eventos.tipoEvento_idtipoEvento);

            if (response.evento.visibilidad == 1)
              this.visibilidadEvento = 'Visible';
            else
              this.visibilidadEvento = 'Oculto';
          },
          error => {
            console.log(<any>error);
          })
      })
  }

  guardarEvento() {
    Swal.showLoading();
    this.eventoPojoService.updateEventoPojo(this.eventos, this.id).subscribe(
      response => {
        if (response.status == 'success') {
          //Actualizar los datos que se ingresaron
          if (response.changes.eventos.nombreEvento) {
            this.eventos.nombreEvento = response.changes.eventos.nombreEvento;
          }
          if (response.changes.eventos.ubicacion) {
            this.eventos.ubicacion = response.changes.eventos.ubicacion;
          }
          if (response.changes.eventos.direccion) {
            this.eventos.direccion = response.changes.eventos.direccion;
          }
          if (response.changes.eventos.detalles) {
            this.eventos.detalles = response.changes.eventos.detalles;
          }
          if (response.changes.eventos.imagen) {
            this.eventos.imagen = response.changes.eventos.imagen;
          }
          if (response.changes.eventos.capacidad) {
            this.eventos.capacidad = response.changes.eventos.capacidad;
          }
          if (response.changes.eventos.ciudad) {
            this.eventos.ciudad_idCiudad = response.changes.eventos.ciudad;
          }
          if (response.changes.eventos.categoria_idCategoria) {
            this.eventos.categoria_idCategoria = response.changes.eventos.categoria_idCategoria;
          }
          if (response.changes.eventos.visibilidad) {
            this.eventos.visibilidad = response.changes.eventos.visibilidad;
          }
          if (response.changes.eventos.tipoEvento_idtipoEvento) {
            this.eventos.tipoEvento_idtipoEvento = response.changes.eventos.tipoEvento_idtipoEvento;
          }
        }
        Swal.fire('','Datos guardados','success');
      }
    )
  }

  guardarEventoySalir(form) {
    this.eventoPojoService.updateEventoPojo(this.eventos, this.id).subscribe(
      response => {
        if (response.status == 'success') {
          //Actualizar los datos que se ingresaron
          if (response.changes.eventos.nombreEvento) {
            this.eventos.nombreEvento = response.changes.eventos.nombreEvento;
          }
          if (response.changes.eventos.ubicacion) {
            this.eventos.ubicacion = response.changes.eventos.ubicacion;
          }
          if (response.changes.eventos.direccion) {
            this.eventos.direccion = response.changes.eventos.direccion;
          }
          if (response.changes.eventos.detalles) {
            this.eventos.detalles = response.changes.eventos.detalles;
          }
          if (response.changes.eventos.imagen) {
            this.eventos.imagen = response.changes.eventos.imagen;
          }
          if (response.changes.eventos.capacidad) {
            this.eventos.capacidad = response.changes.eventos.capacidad;
          }
          if (response.changes.eventos.ciudad) {
            this.eventos.ciudad_idCiudad = response.changes.eventos.ciudad;
          }
          if (response.changes.eventos.categoria_idCategoria) {
            this.eventos.categoria_idCategoria = response.changes.eventos.categoria_idCategoria;
          }
          if (response.changes.eventos.visibilidad) {
            this.eventos.visibilidad = response.changes.eventos.visibilidad;
          }
          if (response.changes.eventos.tipoEvento_idtipoEvento) {
            this.eventos.tipoEvento_idtipoEvento = response.changes.eventos.tipoEvento_idtipoEvento;
          }
        }
      }
    )
    this.router.navigate(['/eventoDetalle/' + this.id]);
  }

  //foto del evento
  imagenUpload(datos) {
    let data = JSON.parse(datos.response);
    this.eventos.imagen = data.image;
  }

  logoUpload(datos) {
    let data = JSON.parse(datos.response);
    this.eventoPojo.logo = data.image;
  }

}
