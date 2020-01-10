import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { EventoUsersService, UserService } from '../../../servicios/servicio.index';
import { evento } from 'src/app/model/evento';
import { Router } from '@angular/router';


@Component({
  selector: 'app-eventos-administrar',
  templateUrl: './eventos-administrar.component.html',
  styleUrls: ['./eventos-administrar.component.css']
})
export class EventosAdministrarComponent implements OnInit {

  public auxEvento = 0; //variable para ocultar o mostrar botón en vista
  public sub; // pruebas para el login con google el sub es el id del usuario
  public identity;
  public misEventosAdmin; //  guarda los eventos que administra el usuario admin

  //Data sorting para eventos admin
  displayedColumns: string[] = ['nombreEvento', 'created_at', 'button'];
  dataSource;
  cantidadEventos: number;


  constructor(private eventoUsersService: EventoUsersService, private userService: UserService,
    private router: Router, public paginatorSettings: MatPaginatorIntl) {
    this.identity = this.userService.getIdentity();
  }

  @ViewChild(MatSort) sort: MatSort; //ordenar datos de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginación de la tabla

  ngOnInit() {
    this.getIdUsuario();
    this.getMisEventosAdmin();
  }

  getIdUsuario() {
    if (!this.identity.id)
      this.sub = this.identity.sub;
    else
      this.sub = this.identity.id;
  }

  //Obtener los eventos que el usuario administra
  getMisEventosAdmin() {
    this.eventoUsersService.getMisEventosAdmin2(this.sub).subscribe(
      response => {
        if (response.code == 200) {
          console.log(response);
          this.misEventosAdmin = response.eventos;
          this.cantidadEventos = response.eventos.length; //cantidad de eventos
          this.dataSource = new MatTableDataSource(response.eventos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          this.dataSource.filterPredicate = (data: evento, filterJson: string) => {
            const matchFilter = [];
            const filters = JSON.parse(filterJson);
            filters.forEach(filter => {
              const val = data[filter.id] === null ? '' : data[filter.id];
              matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
            });
            return matchFilter.every(Boolean);
          };
        }
        if (response.code == 404)
          this.auxEvento = 1;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Redirección a la vista administrativa del evento
  eventosDetalles(idEvento: number) {
    this.router.navigate(['/eventoDetalle/' + idEvento]);
  }

  doFilterMisEventosAdmin(filterValue) {
    const tableFilters = [];
    tableFilters.push({
      id: 'nombreEvento',
      value: filterValue
    });

    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
