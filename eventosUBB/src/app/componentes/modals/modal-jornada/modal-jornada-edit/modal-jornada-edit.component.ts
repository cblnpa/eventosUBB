import { Component, OnInit, Input } from '@angular/core';
import { ModalService, JornadaService } from '../../../../servicios/servicio.index';
import { jornada } from 'src/app/model/jornada';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-jornada-edit',
  templateUrl: './modal-jornada-edit.component.html',
  styleUrls: ['../../modal.css']
})
export class ModalJornadaEditComponent implements OnInit {

  public jornadas: jornada;
  public idEvento;

  @Input() idJornadaEdit: number; // recibe el id de la jornada a editar

  constructor(private modalService: ModalService, private jornadaService: JornadaService) {
    this.jornadas = new jornada('', null, null, null, '', '', null, null);
  }

  ngOnInit() {
    this.getDatosJornada();
  }

  getDatosJornada() {
    this.jornadaService.getJornadaById(this.idJornadaEdit).subscribe(
      response => {
        this.jornadas = response.jornada;
        //Cargar los datos de la jornada en el modal
        this.jornadas = new jornada(this.jornadas.nombreJornada, this.jornadas.fechaJornada,
          this.jornadas.horaInicioJornada, this.jornadas.horaFinJornada, this.jornadas.ubicacionJornada,
          this.jornadas.descripcionJornada, this.jornadas.evento_idEvento, this.jornadas.idJornada);
      }, error => {
        console.log(error);
      }
    )
  }

  editarJornada(form) {
    this.jornadaService.editJornada(this.jornadas, this.jornadas.idJornada).subscribe(
      response => {
        Swal.fire({
          title: 'Jornada editada',
          type: 'success'
        })
        console.log(response);
      }, error => {
        console.log(<any>error);
      }
    )
    this.ocultarModal();
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
    this.getDatosJornada();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal() {
    this.modalService.ocultarModal();
    this.getDatosJornada();
  }
}
