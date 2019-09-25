import { Component, OnInit } from '@angular/core';
import { ModalService, JornadaService } from '../../../../servicios/servicio.index';
import { ActivatedRoute } from '@angular/router';
import { jornada } from 'src/app/model/jornada';

@Component({
  selector: 'app-modal-jornada-edit',
  templateUrl: './modal-jornada-edit.component.html',
  styleUrls: ['../../modal.css']
})
export class ModalJornadaEditComponent implements OnInit {

  public jornadas: jornada;
  public idEvento;

  constructor(private modalService: ModalService, private jornadaService: JornadaService,
    private route: ActivatedRoute) { 
      this.jornadas = new jornada('',null,null,null,'','',null,null);
    }

  ngOnInit() {
    this.getDatosJornada();
  }

  getDatosJornada(){
    this.route.params.subscribe(
      params => {
        let idEvento = +params['id'];
        this.idEvento = idEvento;
        
        this.jornadaService.getJornadas(idEvento).subscribe(
          response => {
            this.jornadas = response.jornadas[0];            
            //Cargar los datos de la jornada en el modal
            this.jornadas = new jornada(this.jornadas.nombreJornada, this.jornadas.fechaJornada,
              this.jornadas.horaInicioJornada, this.jornadas.horaFinJornada, this.jornadas.ubicacionJornada,
              this.jornadas.descripcionJornada, this.jornadas.evento_idEvento, this.jornadas.idJornada);
          }, error => {
            console.log(error);}
        )})
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal(){
    this.modalService.ocultarModal();
  }

  editarJornada(form){
    this.jornadaService.editJornada(this.jornadas, this.jornadas.idJornada).subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log(<any>error);
      }
    )
  }

  //Formulario para agregar jornada
  // agregarJornada(form) {
  //   console.log('antes del servicio');
  //   this.route.params.subscribe(params => {
  //     let id = +params['id'];
  //     this.jornadaAdd.evento_idEvento = id;
  //     console.log(id);
  //     console.log(this.jornadaAdd);
  //     this.jornadaService.guardarJornada(this.jornadaAdd).subscribe(
  //       response => {
  //         console.log(response);
  //         Swal.fire({
  //           type: 'success',
  //           title: 'Creado con éxito',
  //           text: 'Se ha creado la jornada sin ningún problema',
  //         })
  //       },
  //       error => {
  //         console.log(<any>error);
  //       }
  //     )
  //   });
  //   this.ocultarModal();
  // }

}
