import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { UserService, ReportesService } from '../../../servicios/servicio.index';

@Component({
  selector: 'app-reportes-generar',
  templateUrl: './reportes-generar.component.html',
  styleUrls: ['./reportes-generar.component.css']
})
export class ReportesGenerarComponent implements OnInit {

  public token;
  public identity;
  public perfil; // id del perfil del usuario activo
  public sub; // pruebas para el login con google el sub es el id del usuario

  //Data sorting para mostrar los datos del admin UBB
  displayedColumns: string[] = ['nombreUnidad', 'encargadoUnidad', 'nombreEvento', 'encargadoEvento', 'fechaEvento', 'cantParticipantes', 'cupos', 'ciudad'];
  dataSource;
  datosAdminUBB: number; //almacena la info para los reportes del admin UBB

  //Data sorting para mostrar los datos del admin Unidad
  displayedColumns2: string[] = ['encargado', 'nombreEvento', 'fechaEvento', 'comision', 'participantes', 'dependencia', 'ciudad'];
  dataSource2;
  datosAdminUnidad: number; //almacena la info para los reportes del admin unidad

  constructor(private userService: UserService, public paginatorSettings: MatPaginatorIntl,
    private reporteService: ReportesService) {
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  @ViewChild(MatSort) sort: MatSort; //ordenar datos de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginación de la tabla

  ngOnInit() {
    this.perfil = this.identity.perfil_idPerfil;
    this.getIdUsuario();
    this.getReportes();
  }

  getIdUsuario() {
    if (!this.identity.id)
      this.sub = this.identity.sub;
    else
      this.sub = this.identity.id;
  }

  getReportes() {
    this.reporteService.getReporteAdminUBB().subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
