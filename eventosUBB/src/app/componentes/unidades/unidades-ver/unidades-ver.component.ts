import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { Router } from '@angular/router';
import { UnidadService, UserService } from '../../../servicios/servicio.index';
import { global } from '../../../servicios/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidades-ver',
  templateUrl: './unidades-ver.component.html',
  styleUrls: ['./unidades-ver.component.css'],
  providers: [UnidadService]
})
export class UnidadesVerComponent implements OnInit {

  public unidades;
  public subUnidades;
  public cantidadUnidades;
  public cantidadSubUnidades;
  public idPerfil;
  public identity;
  public idUsuario;
  public url;

  //Data sorting para unidad
  displayedColumns: string[] = ['created_at', 'nombreUnidad', 'encargado', 'sede', 'logoUnidad', 'editUnidad', 'deleteUnidad'];
  dataSource;
  filtrar: string;

  //Data sorting para sub unidad
  displayedColumns2: string[] = ['created_at', 'nombreUnidad', 'encargado', 'sede', 'logoUnidad'];
  dataSource2;
  filtrar2: string;

  @ViewChild(MatSort) sort: MatSort; //ordenar datos de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginación de la tabla

  constructor(private unidadService: UnidadService, public paginatorSettings: MatPaginatorIntl,
    private userService: UserService, private router: Router) {
    this.identity = this.userService.getIdentity();
    this.url = global.url;
  }

  ngOnInit() {
    this.getIdUsuario();
    this.getPerfil();
    this.getUnidades();
    this.getSubUnidades();
    this.paginadorSettings();
  }

  getUnidades() {
    this.unidadService.getUnidades().subscribe(
      response => {
        console.log(response);
        this.cantidadUnidades = response.unidades.length;
        this.dataSource = new MatTableDataSource(response.unidades);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return data.unidad.nombreUnidad.toLowerCase().indexOf(filter) != -1;
          });
        }
      },
      error => {
        console.log(<any>error);
      })
  }

  editarUnidad(id) {
    this.router.navigate(['/editarUnidad/' + id]);
  }

  eliminarUnidad(id) {
    Swal.fire({
      title: '¿Quiere eliminar esta unidad?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar unidad',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Swal.showLoading();
        this.unidadService.deleteUnidad(id).subscribe(
          response => {
            console.log(response);
            if (response.code == 200) {
              this.getUnidades();
              Swal.fire('Unidad eliminada', '', 'success')
            }
          }, error => {
            console.log(<any>error);
            Swal.close();
          })
      }
    })
  }

  getSubUnidades() {
    this.unidadService.getSubUnidades(this.idUsuario).subscribe(
      response => {
        this.cantidadSubUnidades = response.subUnidad.length;
        this.dataSource2 = new MatTableDataSource(response.subUnidad);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;

        this.dataSource2.filterPredicate = (data, filter) => {
          return this.displayedColumns2.some(ele => {
            return data.unidad.nombreUnidad.toLowerCase().indexOf(filter) != -1;
          });
        }
      }, error => {
        console.log(<any>error);
      })
  }

  // Asignar a la variable idPerfil el perfil del usuario activo
  getPerfil() {
    this.idPerfil = this.identity.perfil_idPerfil;
  }

  getIdUsuario() {
    if (!this.identity.id)
      this.idUsuario = this.identity.sub;
    else
      this.idUsuario = this.identity.id;
  }

  applyFilter() {
    this.dataSource.filter = this.filtrar.trim().toLowerCase();
  }

  applyFilter2() {
    this.dataSource2.filter = this.filtrar2.trim().toLowerCase();
  }

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }


}
