import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MaterialService, ModalService } from '../../../../../servicios/servicio.index';
import { material } from '../../../../../model/model.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-material',
  templateUrl: './tabla-material.component.html',
  styleUrls: ['../../eventos-editar.component.css']
})
export class TablaMaterialComponent implements OnInit {

  public material: material;
  public contModal: number;
  public idMaterial: number;
  public idMaterialEdit: number = 0;

  public dataSourceMaterial;
  public displayedColumnsMaterial: string[] = ['nombreMaterial', 'archivo', 'created_at', 'editMaterial', 'deleteMaterial'];
  public cantMateriales: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private materialService: MaterialService, private modalService: ModalService,
    public paginatorSettings: MatPaginatorIntl, private route: ActivatedRoute) {
    this.materialService.getGeneralEmitter().subscribe(e => {
      console.log(e + ' estoy en la tabla');
      this.mostrarMateriales();
    })
    this.materialService.getGeneralEmitter().subscribe(edit => {
      console.log(edit + ' editado');
      this.mostrarMateriales();
    })
  }

  ngOnInit() {
    this.mostrarMateriales();
    this.paginadorSettings();
  }

  mostrarMateriales() {
    this.route.params.subscribe(params => {
      let idEvento = params['id'];
      this.materialService.getMateriales(idEvento).subscribe(
        response => {
          if (response.status == 'success') {
            let materialData = response.material;
            console.log(materialData);
            this.cantMateriales = response.material.length;
            this.dataSourceMaterial = new MatTableDataSource(response.material);
            this.dataSourceMaterial.sort = this.sort;
            this.dataSourceMaterial.paginator = this.paginator;
            this.dataSourceMaterial.filterPredicate = (data: material, filterJson: string) => {
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

  agregarMaterialModal() {
    this.contModal = 8;
    this.modalService.mostrarModal();
    this.materialService.getGeneralEmitter().subscribe(e => {
      console.log(e + ' estoy en la tabla');
      this.mostrarMateriales();
    })
  }

  editarMaterial(id) {
    this.contModal = 9;
    this.modalService.mostrarModal();
    this.idMaterialEdit = id;
    this.materialService.getGeneralEmitter().subscribe(edit => {
      console.log(edit + ' estoy en la tabla');
      this.mostrarMateriales();
    })
  }

  eliminarMaterial(idMaterial) {
    Swal.fire({
      title: '¿Quiere eliminar este material?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar material',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.materialService.deleteMaterial(idMaterial).subscribe(
          response => {
            if (response) {
              this.mostrarMateriales();
              Swal.fire('Material eliminado', '', 'success')
            }
          },
          error => {
            console.log(<any>error);
          })
      }
    })
  }

  doFilter(filterValue) {
    // this.dataSourceMaterial.filter = value.trim().toLocaleLowerCase();
    const tableFilters = [];
    tableFilters.push({
      id: 'nombreMaterial',
      value: filterValue
    });

    this.dataSourceMaterial.filter = JSON.stringify(tableFilters);
    if(this.dataSourceMaterial.paginator) {
      this.dataSourceMaterial.paginator.firstPage();
    }
  }

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }

}
