import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { ExpositorService, ModalService } from '../../../../../servicios/servicio.index';
import { expositor } from '../../../../../model/model.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-expositor',
  templateUrl: './tabla-expositor.component.html',
  styleUrls: ['../../eventos-editar.component.css']
})
export class TablaExpositorComponent implements OnInit {

  public expositor: expositor;
  public contModal: number;
  public idExpositor: number;
  public idExpositorEdit: number = 0;

  public dataSourceExpositor;
  public displayedColumnsExpositor: string[] = ['nombreExpositor', 'apellidoExpositor', 'apellido2Expositor', 'correoExpositor', 'empresa', 'telefonoExpositor', 'foto', 'editExpositor', 'deleteExpositor'];
  public cantExpositores: number;

  constructor(private expositorService: ExpositorService, private modalService: ModalService,
    public paginatorSettings: MatPaginatorIntl, private route: ActivatedRoute) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.mostrarExpositores();
    this.paginadorSettings();
  }

  mostrarExpositores() {
    this.route.params.subscribe(params => {
      let idEvento = params['id'];
      this.expositorService.getExpositoresActividad(idEvento).subscribe(
        response => {
          if (response.code == 200 && (response.expositor.length) > 0) {
            this.cantExpositores = response.expositor.length;
            this.dataSourceExpositor = new MatTableDataSource(response.expositor);
            this.dataSourceExpositor.sort = this.sort;
            this.dataSourceExpositor.paginator = this.paginator;
          }
        },
        error => {
          console.log(<any>error);
        })
    })
  }

  agregarExpositorModal() {
    this.contModal = 1;
    this.modalService.mostrarModal();
  }

  editarExpositor(id) {
    this.contModal = 2;
    this.idExpositorEdit = id;
    this.modalService.mostrarModal();
    console.log(this.idExpositorEdit);
  }

  eliminarExpositor(idExpositor) {
    Swal.fire({
      title: '¿Quiere eliminar este expositor?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar expositor',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.expositorService.deleteExpositor(idExpositor).subscribe(
          response => {
            this.mostrarExpositores();
            Swal.fire('Expositor eliminado', 'success')
          },
          error => {
            console.log(<any>error);
          })
      }
    })
  }

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }

}
