import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { Router } from '@angular/router';
import { global } from '../../../servicios/global';
import { EventoUsersService, UserService, EventoPojoService } from '../../../servicios/servicio.index';
import { evento } from 'src/app/model/evento';

@Component({
  selector: 'app-eventos-mis-eventos',
  templateUrl: './eventos-mis-eventos.component.html',
  styleUrls: ['./eventos-mis-eventos.component.css'],
  providers: [EventoUsersService, UserService, EventoPojoService]
})
export class EventosMisEventosComponent implements OnInit {

  public url: string;

  public token;
  public identity;

  public idEvento: number;
  public evento: evento;

  public misEventos; // guarda los eventos en los que participa el usuario
  public misEventosAdmin; //  guarda los eventos que administra el usuario admin

  public perfil; // id del perfil del usuario activo
  public sub; // pruebas para el login con google el sub es el id del usuario

  //Data sorting
  displayedColumns: string[] = ['nombreEvento', 'created_at', 'button'];
  dataSource;
  cantidadEventos: number;
  filtrar: string;

  constructor(private eventoUsersService: EventoUsersService, private userService: UserService,
    private router: Router, public paginatorSettings: MatPaginatorIntl) {
    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  @ViewChild(MatSort) sort: MatSort; //ordenar datos de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginación de la tabla

  ngOnInit() {
    this.perfil = this.identity.perfil_idPerfil;
    this.getIdUsuario();
    this.paginadorSettings();
    this.getMisEventos();
    this.getMisEventosAdmin();
    this.getUsuarios();
  }

  getIdUsuario() {
    if (!this.identity.id)
      this.sub = this.identity.sub;
    else
      this.sub = this.identity.id;
  }

  //Obtener los eventos en los que el usuario participa 
  getMisEventos() {
    this.eventoUsersService.getMisEventos(this.sub).subscribe(
      response => {
        this.misEventos = response.eventos;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Obtener los eventos que el usuario administra
  getMisEventosAdmin() {
    console.log(this.sub);
    this.eventoUsersService.getMisEventosAdmin2(this.sub).subscribe(
      response => {
        console.log(response);
        if (response.status == 'success') {
          this.misEventosAdmin = response.eventos;
          console.log(this.misEventosAdmin);
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
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getUsuarios() {
    this.eventoUsersService.getEventoUsersById(this.idEvento).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  //Redirección a la vista administrativa del evento
  eventosDetalles(idEvento: number) {
    this.router.navigate(['/eventoDetalle/' + idEvento]);
  }

  //Redirección a la vista general del evento
  verEvento(idEvento: number) {
    this.router.navigate(['/eventoDetallePublic/' + idEvento]);
  }

  doFilterMisEventosAdmin(filterValue){
    const tableFilters = [];
    tableFilters.push({
      id: 'nombreEvento',
      value: filterValue
    });

    this.dataSource.filter = JSON.stringify(tableFilters);
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }

}
