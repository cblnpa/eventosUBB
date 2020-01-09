import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { EventoUsersService, UserService } from '../../../servicios/servicio.index';
import { Router } from '@angular/router';


@Component({
  selector: 'app-eventos-inscritos',
  templateUrl: './eventos-inscritos.component.html',
  styleUrls: ['./eventos-inscritos.component.css']
})
export class EventosInscritosComponent implements OnInit {

  public identity;
  public auxEvento = 0; //variable para ocultar o mostrar botón en vista
  public sub; // pruebas para el login con google el sub es el id del usuario
  public misEventos; // guarda los eventos en los que participa el usuario

  //Data sorting para eventos inscritos
  displayedColumns2: string[] = ['nombreEvento', 'fecha_inscripcion', 'estado', 'button'];
  dataSource2;
  cantidadEventos2: number;
  filtrar: string;

  constructor(private router: Router, public paginatorSettings: MatPaginatorIntl,
    private eventoUsersService: EventoUsersService, private userService: UserService ) {
      this.identity = this.userService.getIdentity();
     }

  @ViewChild(MatSort) sort: MatSort; //ordenar datos de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginación de la tabla

  ngOnInit() {
    this.getIdUsuario();
    this.paginadorSettings();
    this.getMisEventos();
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
        if (response.code == 200) {
          console.log(response);
          this.misEventos = response.eventos;
          this.cantidadEventos2 = response.eventos.length;
          this.dataSource2 = new MatTableDataSource(response.eventos);
          this.dataSource2.sort = this.sort;
          this.dataSource2.paginator = this.paginator;

          this.dataSource2.filterPredicate = (data, filter) => {
            return this.displayedColumns2.some(ele => {
              return data.evento.nombreEvento.toLowerCase().indexOf(filter) != -1;
            });
          }
        }
        if (response.eventos.length == 0)
          this.auxEvento = 1;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Redirección a la vista general del evento
  verEvento(idEvento: number) {
    this.router.navigate(['/eventoDetallePublic/' + idEvento]);
  }

  irAEventos() {
    this.router.navigate(['/inicio/']);
  }

  applyFilter() {
    this.dataSource2.filter = this.filtrar.trim().toLowerCase();
  }

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }

}
