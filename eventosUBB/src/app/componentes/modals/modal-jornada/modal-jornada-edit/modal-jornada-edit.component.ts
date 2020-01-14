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
  public fechaActual;

  @Input() idJornadaEdit: number; // recibe el id de la jornada a editar

  constructor(private modalService: ModalService, private jornadaService: JornadaService) {
    this.jornadas = new jornada('', null, null, null, '', '', null, null);
  }

  ngOnInit() {
    this.getDatosJornada();
    this.getActualDate();
  }
  //Obtener fecha actual para bloquear el calendario
  getActualDate() {
    var fecha = new Date();
    var dias = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var year = fecha.getFullYear();

    if (mes < 10 && dias < 10)
      this.fechaActual = year + '-0' + mes + '-0' + dias;
    else if (mes < 10)
      this.fechaActual = year + '-0' + mes + '-' + dias;
    else if (dias < 10)
      this.fechaActual = year + '-' + mes + '-0' + dias;
    else
      this.fechaActual = year + '-' + mes + '-' + dias;

      console.log(this.fechaActual);
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
        if (response) {
          Swal.fire({
            title: 'Jornada editada',
            type: 'success'
          })
          this.jornadaService.getGeneralEmitter().subscribe(edit => {
            console.log(edit);
          })
        }
      }, error => {
        console.log(<any>error);
      }
    )
    this.ocultarModal();
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal() {
    this.modalService.ocultarModal();
  }
}
