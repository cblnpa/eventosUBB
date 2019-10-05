import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { ColaboradorService, ModalService } from '../../../../../servicios/servicio.index';
import { colaborador } from '../../../../../model/model.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-colaborador',
  templateUrl: './tabla-colaborador.component.html',
  styleUrls: ['../../eventos-editar.component.css']
})
export class TablaColaboradorComponent implements OnInit {

  public colaborador: colaborador;
  public contModal: number;
  public idColaborador: number;
  public idColaboradorEdit: number = 0;

  public dataSourceColaborador;
  public displayedColumnsColaborador: string[] = ['nombreColaborador', 'nombreRepresentante', 'telefonoColaborador', 'correoColaborador', 'tipoColaborador', 'sitioWeb', 'logo', 'editColaborador' ,'deleteColaborador'];
  public cantColaboradores: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private colaboradorService: ColaboradorService, private modalService: ModalService,
    public paginatorSettings: MatPaginatorIntl, private route: ActivatedRoute) { }

  ngOnInit() {
    this.mostrarColaboradores();
    this.paginadorSettings();
  }

  mostrarColaboradores() {
    this.route.params.subscribe(params => {
      let idEvento = params['id'];
      this.colaboradorService.getColaboradores(idEvento).subscribe(
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
    })
  }

  agregarColaboradorModal() {
    this.contModal = 6;
    this.modalService.mostrarModal();
  }

  editarColaborador(id) {
    this.contModal = 7;
    this.idColaboradorEdit = id;
    this.modalService.mostrarModal();
  }

  eliminarColaborador(idColaborador) {
    Swal.fire({
      title: '¿Quiere eliminar este colaborador?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar colaborador',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.colaboradorService.deleteColaborador(idColaborador).subscribe(
          response => {
            if (response) {
              this.mostrarColaboradores();
              Swal.fire('Colaborador eliminado', '', 'success')
            }
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
