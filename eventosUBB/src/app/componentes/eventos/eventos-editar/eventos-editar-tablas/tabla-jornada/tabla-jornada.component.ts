import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { JornadaService, ModalService } from '../../../../../servicios/servicio.index';
import { jornada } from '../../../../../model/model.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-jornada',
  templateUrl: './tabla-jornada.component.html',
  styleUrls: ['../../eventos-editar.component.css']
})
export class TablaJornadaComponent implements OnInit {

  public jornada: jornada;
  public contModal: number;
  public idJornada: number;
  public idJornadaEdit: number = 0;

  public dataSourceJornada;
  public displayedColumnsJornada: string[] = ['nombreJornada', 'fechaJornada', 'horaInicioJornada', 'horaFinJornada', 'ubicacionJornada', 'descripcionJornada', 'editJornada', 'deleteJornada'];
  public cantJornadas: number;

  constructor(private jornadaService: JornadaService, private modalService: ModalService,
    public paginatorSettings: MatPaginatorIntl, private route: ActivatedRoute) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.mostrarJornadas();
    this.paginadorSettings();
  }

  mostrarJornadas() {
    this.route.params.subscribe(params => {
      let idEvento = params['id'];
      this.jornadaService.getJornadas(idEvento).subscribe(
        response => {
          if (response.status == 'success') {
            this.cantJornadas = response.jornadas.length;
            this.dataSourceJornada = new MatTableDataSource(response.jornadas);
            this.dataSourceJornada.sort = this.sort;
            this.dataSourceJornada.paginator = this.paginator;
          }
        },
        error => {
          console.log(<any>error);
        })
    })
  }

  agregarJornadaModal() {
    this.contModal = 1;
    this.modalService.mostrarModal();
  }
  
  editarJornada(id) {
    this.contModal = 2;
    this.idJornadaEdit = id;
    this.modalService.mostrarModal();
  }

  eliminarJornada(idJornada) {
    Swal.fire({
      title: '¿Quiere eliminar esta jornada?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar jornada',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.jornadaService.deleteJornada(idJornada).subscribe(
          response => {
            if (response) {
              this.mostrarJornadas();
              Swal.fire('Jornada eliminada', 'success')
            }
          },
          error => {
            console.log(error);
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
