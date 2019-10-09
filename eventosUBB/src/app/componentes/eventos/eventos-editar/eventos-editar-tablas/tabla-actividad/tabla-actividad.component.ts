import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { ActividadService, ModalService } from '../../../../../servicios/servicio.index';
import { actividad } from '../../../../../model/model.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-actividad',
  templateUrl: './tabla-actividad.component.html',
  styleUrls: ['../../eventos-editar.component.css']
})
export class TablaActividadComponent implements OnInit {

  public actividad: actividad;
  public contModal: number;
  public idActividad: number;
  public idActividadEdit: number = 0;

  public dataSourceActividad;
  public displayedColumnsActividad: string[] = ['nombreActividad', 'horaInicioActividad', 'horaFinActividad', 'ubicacionActividad', 'actividadParalela', 'cupos', 'descripcionActividad', 'editActividad', 'deleteActividad'];
  public cantActividades: number;

  constructor(private actividadService: ActividadService, private modalService: ModalService,
    public paginatorSettings: MatPaginatorIntl, private route: ActivatedRoute) {
    this.actividadService.getGeneralEmitter().subscribe(e => {
      console.log(e + " estoy en tabla");
      this.mostrarActividades();
    })
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.mostrarActividades();
    this.paginadorSettings();
  }

  mostrarActividades() {
    this.route.params.subscribe(params => {
      let idEvento = params['id'];
      this.actividadService.getActividades(idEvento).subscribe(
        response => {
          let arreglo = [];
          if (response.code == 200 && (response.actividades.length) > 0) {
            for (var i = 0; i < response.actividades.length; i++) {
              if (response.actividades[i] != null) {
                arreglo.push(response.actividades[i]);
              }
            }
            this.cantActividades = arreglo.length;
            this.dataSourceActividad = new MatTableDataSource(arreglo);
            this.dataSourceActividad.sort = this.sort;
            this.dataSourceActividad.paginator = this.paginator;
          } else {
            console.log('este evento aún no tiene actividades');
          }
        },
        error => {
          console.log(<any>error);
        })
    })
  }

  agregarActividadModal() {
    this.contModal = 4;
    this.modalService.mostrarModal();
  }

  editarActividad(id) {
    this.contModal = 5;
    this.idActividadEdit = id;
    this.modalService.mostrarModal();
  }

  eliminarActividad(idActividad) {
    Swal.fire({
      title: '¿Quiere eliminar esta actividad?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar actividad',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.actividadService.deleteActividad(idActividad).subscribe(
          response => {
            if (response) {
              this.mostrarActividades();
              Swal.fire('Actividad eliminada', '', 'success')
            }
          },
          error => {
            console.log(<any>error);
          }
        )
      }
    })
  }

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }

}
