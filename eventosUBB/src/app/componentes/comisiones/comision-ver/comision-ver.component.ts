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
  displayedColumns: string[] = ['idEvento', 'nombreEvento', 'button'];
  public dataSource;

  constructor(private eventoUsersService: EventoUsersService, private userService: UserService,
    private router: Router, public paginatorSettings: MatPaginatorIntl) {
    this.url = global.url;
    this.identity = this.userService.getIdentity();
  }

  @ViewChild(MatSort) sort: MatSort; //ordenar datos de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginación de la tabla

  ngOnInit() {
    // this.getMisEventosAdmin();
    this.eventoUsersService.getMisEventosAdmin(this.identity.sub).subscribe(
      response => {
        console.log(response);
        this.cantEventos = response.eventos.length;
        this.dataSource = new MatTableDataSource(response.eventos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(<any>error);
      });
    this.paginadorSettings();
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

}
