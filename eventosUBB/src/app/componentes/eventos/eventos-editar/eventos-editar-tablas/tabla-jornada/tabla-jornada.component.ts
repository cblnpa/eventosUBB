import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { JornadaService, ModalService } from '../../../../../servicios/servicio.index';
import { jornada } from '../../../../../model/model.index';

@Component({
  selector: 'app-tabla-jornada',
  templateUrl: './tabla-jornada.component.html',
  styleUrls: ['../../eventos-editar.component.css']
})
export class TablaJornadaComponent implements OnInit {

  public jornada: jornada; 
  public contModal: number;

  public dataSourceJornada;
  public displayedColumnsJornada: string[] = ['nombreJornada', 'fechaJornada', 'horaInicioJornada', 'horaFinJornada', 'ubicacionJornada', 'descripcionJornada','editJornada', 'deleteJornada'];
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

  eliminarJornada(idJornada) {
    this.jornadaService.deleteJornada(idJornada).subscribe(
      response => {
        console.log(response);
        this.mostrarJornadas();
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

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }

}
