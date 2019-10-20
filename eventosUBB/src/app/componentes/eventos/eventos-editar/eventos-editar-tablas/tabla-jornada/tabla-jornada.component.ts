import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { JornadaService, ModalService } from '../../../../../servicios/servicio.index';
import { jornada } from '../../../../../model/model.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-jornada',
  templateUrl: './tabla-jornada.component.html',
  styleUrls: ['../../eventos-editar.component.css']
})
export class TablaJornadaComponent implements OnInit {

  public jornada: jornada;
  public contModal: number;
  public idJornada: number;
  public idJornadaEdit: number = 0;

  public dataSourceJornada;
  public displayedColumnsJornada: string[] = ['nombreJornada', 'fechaJornada', 'horaInicioJornada', 'horaFinJornada', 'ubicacionJornada', 'descripcionJornada', 'editJornada', 'deleteJornada'];
  public cantJornadas: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private jornadaService: JornadaService, private modalService: ModalService,
    public paginatorSettings: MatPaginatorIntl, private route: ActivatedRoute) {
    this.jornadaService.getGeneralEmitter().subscribe(e => {
      console.log(e + ' tabla jornada');
      this.mostrarJornadas();
    })
    this.jornadaService.getGeneralEmitter().subscribe(edit => {
      console.log(edit + ' tabla jornada');
      this.mostrarJornadas();
    })
    
  }

  ngOnInit() {
    this.mostrarJornadas();
    this.paginadorSettings();
  }

  mostrarJornadas() {
    this.route.params.subscribe(params => {
      let idEvento = params['id'];
      this.jornadaService.getJornadas(idEvento).subscribe(
        response => {
          if (response.status == 'success') {
            this.cantJornadas = response.jornadas.length;
            this.dataSourceJornada = new MatTableDataSource(response.jornadas);
            this.dataSourceJornada.sort = this.sort;
            this.dataSourceJornada.paginator = this.paginator;

            this.dataSourceJornada.filterPredicate = (data: jornada, filterJson: string) => {
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
        })
    })
  }

  agregarJornadaModal() {
    this.contModal = 1;
    this.modalService.mostrarModal();
    this.jornadaService.getGeneralEmitter().subscribe(e => {
      console.log(e + " estoy en tabla");
      this.mostrarJornadas();
    })
  }

  changeFromParent(){
    this.idJornadaEdit;
  }

  editarJornada(id) {
    this.contModal = 2;
    this.idJornadaEdit = id;
    this.modalService.mostrarModal();
    this.jornadaService.getGeneralEmitter().subscribe(edit => {
      console.log(edit + ' tabla jornada');
      this.mostrarJornadas();
    })
  }

  eliminarJornada(idJornada) {
    Swal.fire({
      title: '¿Quiere eliminar esta jornada?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar jornada',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.jornadaService.deleteJornada(idJornada).subscribe(
          response => {
            if (response) {
              this.mostrarJornadas();
              Swal.fire('Jornada eliminada', '', 'success')
            }
          },
          error => {
            console.log(error);
          })
      }
    })
  }

  doFilterJornada(filterValue){
    const tableFilters = [];
    tableFilters.push({
      id: 'nombreJornada',
      value: filterValue
    });

    this.dataSourceJornada.filter = JSON.stringify(tableFilters);
    if(this.dataSourceJornada.paginator){
      this.dataSourceJornada.paginator.firstPage();
    }

  }

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }

}
