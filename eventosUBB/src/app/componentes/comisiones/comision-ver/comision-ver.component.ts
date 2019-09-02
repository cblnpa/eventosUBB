import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable, MatTableDataSource } from '@angular/material';
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

  //Data sorting
  displayedColumns: string[] = ['idEvento', 'nombreEvento', 'button'];
  public dataSource;

  constructor(private eventoUsersService: EventoUsersService, private userService: UserService,
    private router: Router) {
    this.url = global.url;
    this.identity = this.userService.getIdentity();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // this.getMisEventosAdmin();
    this.eventoUsersService.getMisEventosAdmin(this.identity.sub).subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response.eventos);
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(<any>error);
      })
  }

  //Redirección a la vista administrativa del evento
  eventosDetalles(idEvento: number) {
    this.router.navigate(['/eventoDetalle/' + idEvento]);
  }

}
