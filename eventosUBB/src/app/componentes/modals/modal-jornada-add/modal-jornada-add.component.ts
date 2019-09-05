import { Component, OnInit } from '@angular/core';
import { ModalService, JornadaService } from '../../../servicios/servicio.index';
import { jornada } from '../../../model/jornada';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-jornada-add',
  templateUrl: './modal-jornada-add.component.html',
  styleUrls: ['./modal-jornada-add.component.css']
})
export class ModalJornadaAddComponent implements OnInit {

  public jornadaAdd: jornada;

  constructor(private modalService: ModalService, private jornadaService: JornadaService,
    private route: ActivatedRoute) {
      this.jornadaAdd = new jornada('',null,null,null,'','',null);
     }

  ngOnInit() {
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal(){
    this.modalService.ocultarModal();
  }

  //Formulario para agregar jornada
  agregarJornada(form) {
    console.log('antes del servicio');
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.jornadaAdd.evento_idEvento = id;
      console.log(id);
      console.log(this.jornadaAdd);
      this.jornadaService.guardarJornada(this.jornadaAdd).subscribe(
        response => {
          console.log(response);
          Swal.fire({
            type: 'success',
            title: 'Creado con éxito',
            text: 'Se ha creado la jornada sin ningún problema',
          })
        },
        error => {
          console.log(<any>error);
        }
      )
    });
    this.ocultarModal();
  }

}
