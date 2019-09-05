import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { global } from '../../../servicios/global'
import { UnidadService } from '../../../servicios/servicio.index';

@Component({
  selector: 'app-unidades-ver',
  templateUrl: './unidades-ver.component.html',
  styleUrls: ['./unidades-ver.component.css'],
  providers: [UnidadService]
})
export class UnidadesVerComponent implements OnInit {

  public url;
  public unidades;
  public cantidad;

  //Data sorting
  displayedColumns: string[] = ['created_at','nombreUnidad','encargado','sede','logoUnidad'];
  dataSource;
  filtrar: string;

  constructor(private unidadService: UnidadService, public paginatorSettings: MatPaginatorIntl) {
    this.url = global.url;
  }

  @ViewChild(MatSort) sort: MatSort; //ordenar datos de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginación de la tabla

  ngOnInit() {
    this.paginadorSettings();
    this.getUnidades();
  }

  getUnidades() {
    this.unidadService.getUnidades().subscribe(
      response => {
        console.log('unidades!!');
        console.log(response);
        this.unidades = response.unidades.length;
        this.dataSource = new MatTableDataSource(response.unidades);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(<any>error);
      })
  }

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }

  limpiarBuscador(){
    this.filtrar = "";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.filtrar.trim().toLowerCase();
  }

}
