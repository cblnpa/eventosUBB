import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { global } from '../../../servicios/global'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { eventoPojo, ciudad, evento, jornada, actividad, colaborador, expositor, material } from '../../../model/model.index';
import {
  EventoPojoService, CiudadService, UserService, EventoService, JornadaService, TipoEventoService,
  ExpositorService, ActividadService, ModalService, MaterialService, ColaboradorService, CategoriaService
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
  public categorias;
  public tipoEvento;
  public status;
  public id; //id del evento
  public idUsuario; //id del usuario (sub) 

  public contModal: number;

  //variables para el data table
  public dataSourceJornada;
  public displayedColumnsJornada: string[] = ['nombreJornada', 'fechaJornada', 'horaInicioJornada', 'horaFinJornada', 'ubicacionJornada', 'descripcionJornada','editJornada', 'deleteJornada'];
  public cantJornadas: number;

  public dataSourceExpositor;
  public displayedColumnsExpositor: string[] = ['nombreExpositor', 'apellidoExpositor', 'apellido2Expositor', 'correoExpositor', 'empresa', 'telefonoExpositor', 'foto', 'editExpositor', 'deleteExpositor'];
  public cantExpositores: number;

  public dataSourceActividad;
  public displayedColumnsActividad: string[] = ['nombreActividad', 'horaInicioActividad', 'horaFinActividad', 'ubicacionActividad', 'actividadParalela', 'cupos', 'descripcionActividad', 'deleteActividad'];
  public cantActividades: number;

  public dataSourceColaborador;
  public displayedColumnsColaborador: string[] = ['nombreColaborador', 'nombreRepresentante', 'telefonoColaborador', 'correoColaborador', 'tipoColaborador', 'sitioWeb', 'logo', 'deleteColaborador'];
  public cantColaboradores: number;

  public dataSourceMaterial;
  public displayedColumnsMaterial: string[] = ['nombreMaterial', 'archivo', 'created_at','deleteMaterial'];
  public cantMateriales: number;

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
    private ciudadService: CiudadService, private categoriaService: CategoriaService, private jornadaService: JornadaService,
    private expositorService: ExpositorService, private modalService: ModalService, private tipoEventoService: TipoEventoService,
    private eventoService: EventoService, private actividadService: ActividadService, public paginatorSettings: MatPaginatorIntl,
    private materialService: MaterialService, private colaboradorService: ColaboradorService) {
    //Objeto para editar el evento, step 1
    this.eventos = new evento('', '', '', '', '', null, '', null, null, null, null, null);
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = global.url;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getDatosEvento();
    this.getCiudades();
    this.getCategorias();
    this.getTipoEventos();
    this.mostrarJornadas();
    this.mostrarExpositores();
    this.mostrarActividades();
    this.mostrarColaboradores();
    this.mostrarMateriales();
    this.paginadorSettings();
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
        console.log(response);
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
            this.eventos = response.evento;
            //Mostrar los datos del evento en el stepper 
            this.eventos = new evento(this.eventos.nombreEvento, this.eventos.ubicacion, this.eventos.direccion,
              this.eventos.detalles, this.eventos.imagen, this.eventos.capacidad, this.eventos.nombreEventoInterno,
              this.eventos.ciudad_idCiudad, this.eventos.categoria_idCategoria, this.eventos.visibilidad,
              this.eventos.tipoEvento_idtipoEvento)
          },
          error => {
            console.log(<any>error);
          })
      })
  }

  guardarEvento(form) {
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

  //Listar jornadas del evento en la tabla
  mostrarJornadas() {
    this.jornadaService.getJornadas(this.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.cantJornadas = response.jornadas.length;
          console.log((response.jornadas));
          //this.jornada = response.jornadas;
          this.dataSourceJornada = new MatTableDataSource(response.jornadas);
          this.dataSourceJornada.sort = this.sort;
          this.dataSourceJornada.paginator = this.paginator;
        }
      },
      error => {
        console.log(<any>error);
      })
  }

  agregarJornadaModal() {
    this.contModal = 1;
    this.modalService.mostrarModal();
  }

  eliminarJornada(idJornada) {
    this.jornadaService.deleteJornada(idJornada).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  editarJornada(){
    console.log('dentro de editar jornada');
    this.contModal = 11;
    this.modalService.mostrarModal();
  }

  mostrarExpositores() {
    this.expositorService.getExpositoresActividad(this.id).subscribe(
      response => {
        if (response.code == 200 && (response.expositor.length) > 0) {
          this.cantExpositores = response.expositor.length;
          this.dataSourceExpositor = new MatTableDataSource(response.expositor);
          this.dataSourceExpositor.sort = this.sort;
          this.dataSourceExpositor.paginator = this.paginator;
        } else {
          console.log('este evento aún no tiene expositores');
        }
      },
      error => {
        console.log(<any>error);
      })
  }

  agregarExpositorModal() {
    this.contModal = 2;
    this.modalService.mostrarModal();
  }

  eliminarExpositor(idExpositor) {
    this.expositorService.deleteExpositor(idExpositor).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  editarExpositor(id) {
    this.contModal = 22;
    console.log(id);
    this.modalService.mostrarModal();
  }

  mostrarActividades() {
    this.actividadService.getActividades(this.id).subscribe(
      response => {
        console.log(response);
        if (response.code == 200 && (response.actividades.length) > 0) {
          this.cantActividades = response.actividades.length;
          this.dataSourceActividad = new MatTableDataSource(response.actividades);
          this.dataSourceActividad.sort = this.sort;
          this.dataSourceActividad.paginator = this.paginator;
        } else {
          console.log('este evento aún no tiene actividades');
        }
      },
      error => {
        console.log(<any>error);
      })
  }

  agregarActividadModal() {
    this.contModal = 3;
    this.modalService.mostrarModal();
  }

  eliminarActividad(idActividad) {
    this.actividadService.deleteActividad(idActividad).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  mostrarColaboradores() {
    this.colaboradorService.getColaboradores(this.id).subscribe(
      response => {
        console.log(response);
        if (response.code == 200 && (response.colaborador.length) > 0) {
          this.cantColaboradores = response.colaborador.length;
          this.dataSourceColaborador = new MatTableDataSource(response.colaborador);
          this.dataSourceColaborador.sort = this.sort;
          this.dataSourceColaborador.paginator = this.paginator;
        } else {
          console.log('aún no hay ningún colaborador en este evento');
        }
      },
      error => {
        console.log(<any>error);
      })
  }

  agregarColaboradorModal() {
    this.contModal = 5;
    this.modalService.mostrarModal();
  }

  eliminarColaborador(idColaborador) {
    this.colaboradorService.deleteColaborador(idColaborador).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  mostrarMateriales() {
    this.materialService.getMateriales(this.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.cantMateriales = response.material.length;
          this.dataSourceMaterial = new MatTableDataSource(response.material);
          this.dataSourceMaterial.sort = this.sort;
          this.dataSourceMaterial.paginator = this.paginator;
        }
      },
      error => {
        console.log(<any>error);
      })
  }

  agregarMaterialModal() {
    this.contModal = 4;
    this.modalService.mostrarModal();
  }

  eliminarMaterial(idMaterial){
    this.materialService.deleteMaterial(idMaterial).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
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

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }

}
