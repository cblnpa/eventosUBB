import { Component, OnInit } from '@angular/core';
import { ModalService, JornadaService } from '../../../servicios/servicio.index';
import { jornada } from '../../../model/jornada';
import { ActivatedRoute } from '@angular/router';

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

  ocultarModal() {
    this.modalService.ocultarModal();
  }

  //Formulario para agregar jornada
  agregarJornada(form) {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.jornadaAdd.evento_idEvento = id;
      this.jornadaService.guardarJornada(this.jornadaAdd).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(<any>error);
        }
      )
    });
    this.ocultarModal();
  }

}
