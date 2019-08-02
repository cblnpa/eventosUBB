import { Component, OnInit } from '@angular/core';
import { ModalService, ActividadService, JornadaService, ExpositorService } from '../../../servicios/servicio.index';
import { actividad, jornada, expositor } from '../../../model/model.index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-actividad-add',
  templateUrl: './modal-actividad-add.component.html',
  styleUrls: ['./modal-actividad-add.component.css']
})
export class ModalActividadAddComponent implements OnInit {

  public actividadAdd: actividad;
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
    placeholder: 'Seleccionar expositor', // text to be displayed when no item is selected defaults to Select,
    noResultsFound: '¡No se encuentra el expositor!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Buscar expositor', // label thats displayed in search input,
    searchOnKey: '' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  constructor(private modalService: ModalService, private actividadService: ActividadService,
    private route: ActivatedRoute, private jornadaService: JornadaService,
    private expositorService: ExpositorService) {
    this.actividadAdd = new actividad('', null, null, '', '',null,null);
    this.jornada = new jornada('', null, null, null, '', '');
    this.expositor = new expositor('', '', '', '', '', '', null);
  }

  ngOnInit() {
    this.mostrarExpositores();
    this.mostrarJornadas();
  }

  //Servicio para obtener jornadas
  mostrarJornadas() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.jornadaService.getJornadas(id).subscribe(
          response => {
            this.optionsJornadas = response.jornadas;
          },
          error => {
            console.log(<any>error);
          })
      });
  }

  //Servicio para obtener expositores
  mostrarExpositores() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.expositorService.getExpositores(id).subscribe(
          response => {
            this.optionsExpositores = response.expositor;
          },
          error => {
            console.log(<any>error);
          })
      });
  }

  ocultarModal() {
    this.modalService.ocultarModal();
  }

  //Formulario para agregar actividad
  agregarActividad(form) {
    
    //asignar el id de la jornada seleccionada
    this.idJornada = this.jornadas.idJornada;
    this.actividadAdd.jornada_idJornada = this.idJornada;

    //asignar el id del expositor seleccionado
    this.idExpositor = this.expositores.idExpositor;
    this.actividadAdd.expositor_idExpositor = this.idExpositor;

    this.actividadService.guardarActividad(this.actividadAdd).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
    this.ocultarModal();
  }

}
