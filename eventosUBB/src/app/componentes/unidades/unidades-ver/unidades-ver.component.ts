import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { global } from '../../../servicios/global'
import { UnidadService, UserService } from '../../../servicios/servicio.index';

@Component({
  selector: 'app-unidades-ver',
  templateUrl: './unidades-ver.component.html',
  styleUrls: ['./unidades-ver.component.css'],
  providers: [UnidadService]
})
export class UnidadesVerComponent implements OnInit {

  public url;
  public unidades;
  public subUnidades;
  public cantidadUnidades;
  public cantidadSubUnidades;
  public idPerfil;
  public identity;

  //Data sorting
  displayedColumns: string[] = ['created_at','nombreUnidad','encargado','sede','logoUnidad'];
  dataSource;
  filtrar: string;

  displayedColumns2: string[] = ['created_at','nombreUnidad','encargado','sede','logoUnidad'];
  dataSource2;
  filtrar2: string;

  constructor( private unidadService: UnidadService, public paginatorSettings: MatPaginatorIntl,
    private userService: UserService) {
    this.url = global.url;
    this.identity = this.userService.getIdentity();
  }

  @ViewChild(MatSort) sort: MatSort; //ordenar datos de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginación de la tabla

  ngOnInit() {
    this.paginadorSettings();
    this.getUnidades();
    this.getSubUnidades();
    this.getPerfil();
  }

  getUnidades() {
    this.unidadService.getUnidades().subscribe(
      response => {
        this.cantidadUnidades = response.unidades.length;
        this.dataSource = new MatTableDataSource(response.unidades);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(<any>error);
      })
  }

  getSubUnidades() {
    this.unidadService.getSubUnidades().subscribe(
      response => {
        this.cantidadSubUnidades = response.unidades.length;
        this.dataSource2 = new MatTableDataSource(response.unidades);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;
      }, error =>{
        console.log(<any>error);
      })
  }

    // Asignar a la variable idPerfil el perfil del usuario activo
    getPerfil(){
      this.idPerfil = this.identity.perfil_idPerfil;
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
