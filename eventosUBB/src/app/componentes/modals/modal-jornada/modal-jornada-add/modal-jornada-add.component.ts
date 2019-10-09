import { Component, OnInit } from '@angular/core';
import { ModalService, JornadaService } from '../../../../servicios/servicio.index';
import { jornada } from '../../../../model/model.index';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-jornada-add',
  templateUrl: './modal-jornada-add.component.html',
  styleUrls: ['../../modal.css']
})
export class ModalJornadaAddComponent implements OnInit {

  public jornadaAdd: jornada;
  public idEvento;

  constructor(private modalService: ModalService, private jornadaService: JornadaService,
    private route: ActivatedRoute) {
    this.jornadaAdd = new jornada('', null, null, null, '', '', null);
  }

  ngOnInit() { }

  //Formulario para agregar jornada
  agregarJornada(form) {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.idEvento = id;
      this.jornadaAdd.evento_idEvento = id;
      this.jornadaService.guardarJornada(this.jornadaAdd).subscribe(
        response => {
          if (response.code == 200) {
            Swal.fire({
              type: 'success',
              title: 'Creado con éxito',
              text: 'Se ha creado la jornada sin ningún problema',
            });
            this.jornadaService.getGeneralEmitter().subscribe(e => {
              console.log(e);
            })
          }
        },
        error => {
          console.log(<any>error);
        }
      )
      this.ocultarModal();
    });
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal() {
    this.modalService.ocultarModal();
    this.jornadaAdd = new jornada('',null,null,null,'','');
  }

}
