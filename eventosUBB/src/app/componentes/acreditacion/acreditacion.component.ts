import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EventoUsersService, EventoPojoService } from '../../servicios/servicio.index';
import { users } from 'src/app/model/users';
import { asistencia } from 'src/app/model/asistencia';

@Component({
  selector: 'app-acreditacion',
  templateUrl: './acreditacion.component.html',
  styleUrls: ['./acreditacion.component.css']
})
export class AcreditacionComponent implements OnInit {

  public idEvento;
  public sinParticipantes = 0; //indica si hay participantes o no para mostrar un mensaje
  public asistencia: asistencia; //modelo que posee evento_idEvento & users_id *se ocupa para el request

  public dataSource;
  public displayedColumns: string[] = ['index', 'nombreParticipante', 'acreditar'];
  public cantidad: number;


  constructor(public paginatorSettings: MatPaginatorIntl, private route: ActivatedRoute,
    private eventoUsersService: EventoUsersService, private eventoPojoService: EventoPojoService) {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getParticipantes();
  }

  getParticipantes() {
    this.route.params.subscribe(params => {
      this.idEvento = params['idEvento'];
      this.eventoUsersService.getEventoUsersById(this.idEvento).subscribe(
        response => {
          if (response.code == 200 && (response.evento.length) > 0) {
            console.log(response);
            this.cantidad = response.evento.length;
            this.dataSource = new MatTableDataSource(response.evento);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;

            this.dataSource.filterPredicate = (data: users, filterJson: string) => {
              const matchFilter = [];
              const filters = JSON.parse(filterJson);

              filters.forEach(filter => {
                const val = data[filter.id] === null ? '' : data[filter.id];
                matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
              });
              return matchFilter.every(Boolean);
            };
          } else {
            this.sinParticipantes = 1;
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    })
  }

  acreditar(id) {
    this.asistencia = new asistencia(this.idEvento, id);
    this.eventoPojoService.asistenciaUsuarios(this.asistencia).subscribe(
      response => {
        console.log(response);
        this.getParticipantes();
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  doFilter(filterValue) {
    const tableFilters = [];
    tableFilters.push({
      id: 'nombreParticipante',
      value: filterValue
    });

    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }

}
