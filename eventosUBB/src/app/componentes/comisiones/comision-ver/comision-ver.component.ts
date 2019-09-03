import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { EventoUsersService, UserService } from '../../../servicios/servicio.index';
import { global } from '../../../servicios/global'
import { Router } from '@angular/router';

@Component({
  selector: 'app-comision-ver',
  templateUrl: './comision-ver.component.html',
  styleUrls: ['./comision-ver.component.css']
})
export class ComisionVerComponent implements OnInit {

  public url;
  public eventos;
  public identity;
  public cantEventos; //número de eventos encontrados

  //Data sorting
  displayedColumns: string[] = ['nombreEvento','created_at', 'button'];
  dataSource;
  filtrar: string; 

  constructor(private eventoUsersService: EventoUsersService, private userService: UserService,
    private router: Router, public paginatorSettings: MatPaginatorIntl) {
    this.url = global.url;
    this.identity = this.userService.getIdentity();
  }

  @ViewChild(MatSort) sort: MatSort; //ordenar datos de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginación de la tabla

  ngOnInit() {
    this.paginadorSettings();
    this.eventoUsersService.getMisEventosAdmin(this.identity.sub).subscribe(
      response => {
        console.log(response);
        this.cantEventos = response.eventos.length; //cantidad de eventos
        this.dataSource = new MatTableDataSource(response.eventos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'button' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        }
      },
      error => {
        console.log(<any>error);
      });

  }

  //Redirección a la vista administrativa del evento
  eventosDetalles(idEvento: number) {
    this.router.navigate(['/eventoDetalle/' + idEvento]);
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
