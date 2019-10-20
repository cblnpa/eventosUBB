import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ModalService, ActividadService, JornadaService, ExpositorService } from '../../../../servicios/servicio.index';
import { jornada, expositor, actividadPojo } from '../../../../model/model.index';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-actividad-edit',
  templateUrl: './modal-actividad-edit.component.html',
  styleUrls: ['../../modal.css']
})
export class ModalActividadEditComponent implements OnInit {

  public actividadPojo: actividadPojo;
  //variables para agregar los objetos en el select dropdown
  public jornadas: any = [];
  public jornada: jornada;
  public expositores: any = [];
  public expositor: expositor;

  //opciones para el selector
  public optionsJornadas;
  public optionsExpositores;

  //enviar id del select dropdown
  public idJornada;
  public idExpositor;
  public idEvento;

  //opciones del select dropdown
  jornadaConfig = {
    displayKey: 'nombreJornada', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Seleccionar jornada', // text to be displayed when no item is selected defaults to Select,
    noResultsFound: '¡No se encuentra la jornada!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Buscar jornada', // label thats displayed in search input,
    searchOnKey: '' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  //opciones del select dropdown
  expositorConfig = {
    displayKey: 'nombreExpositor', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Seleccionar expositores', // text to be displayed when no item is selected defaults to Select,
    moreText: 'más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: '¡No se encuentra el expositor!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Buscar expositor', // label thats displayed in search input,
    searchOnKey: 'idExpositor' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  @Input() idActividadEdit: number; //recibe el id de la actividad a editar

  constructor(private modalService: ModalService, private actividadService: ActividadService,
    private route: ActivatedRoute, private jornadaService: JornadaService,
    private expositorService: ExpositorService) {
    this.actividadPojo = new actividadPojo('', null, null, '', '', null, null, null, '', null);
    this.jornada = new jornada('', null, null, null, '', '');
    this.expositor = new expositor('', '', '', '', '', '', '', null, null);
    this.actividadPojo = new actividadPojo('', null, null, '', '', null, null, null, '', null);
  }

  ngOnInit() {
    this.getDatosActividad();
    this.mostrarExpositores();
    this.mostrarJornadas();
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    console.log(this.idActividadEdit);
    this.actividadPojo.idActividad = this.idActividadEdit;
    this.getDatosActividad();
  }

  getDatosActividad() {
    this.actividadService.getActividadById(this.idActividadEdit).subscribe(
      response => {
        this.actividadPojo = response.actividad;
        //Carga los datos de la actividad en el modal
        this.actividadPojo = new actividadPojo(this.actividadPojo.nombreActividad, this.actividadPojo.horaInicioActividad,
          this.actividadPojo.horaFinActividad, this.actividadPojo.ubicacionActividad, this.actividadPojo.descripcionActividad,
          this.actividadPojo.cupos, this.actividadPojo.actividadParalela, this.actividadPojo.jornada_idJornada,
          this.actividadPojo.expositor, this.actividadPojo.evento, this.idActividadEdit);
      }, error => {
        console.log(<any>error);
      }
    )
  }

  //Servicio para obtener expositores
  mostrarExpositores() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.expositorService.getExpositoresActividad(id).subscribe(
          response => {
            this.optionsExpositores = response.expositor;
          },
          error => {
            console.log(<any>error);
          })
      });
  }

  //Servicio para obtener jornadas
  mostrarJornadas() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.idEvento = id;
        this.jornadaService.getJornadas(id).subscribe(
          response => {
            this.optionsJornadas = response.jornadas;
          },
          error => {
            console.log(<any>error);
          })
      });
  }

  editarActividad(form){
    this.actividadService.editActividad(this.actividadPojo,this.actividadPojo.idActividad).subscribe(
      response => {
        if(response){
          Swal.fire({
            title: 'Actividad editada',
            type: 'success'
          })
          this.actividadService.getGeneralEmitter().subscribe(edit => {
            console.log(edit);
          })
        }
      }, error => {
        console.log(<any>error);
      }
    )
    this.ocultarModal();
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal() {
    this.modalService.ocultarModal();
  }

}
