import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoPojoService } from '../../servicios/servicio.index';
import { evento } from '../../model/model.index';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})

export class ProgramaComponent implements OnInit {
  public idPersona;

  //arreglos que almacenan los objetos
  public arrActividades = [];
  public arrColaboradores = [];
  public arrJornadas = [];
  public arrExpositores = [];

  //acá están los datos del evento
  public evento: evento;

  constructor(private eventoPojoService: EventoPojoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getEventosDetalle();
  }

  getEventosDetalle() {
    this.route.params.subscribe(params => {
      //Obtener el id del evento que viene por URL
      let idEvento = +params['id'];

      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(
        response => {
          console.log(response);
          if (response.code == 200) {
            //Almacenar las actividades 
            if (response.actividad.length > 0) {
              for (var i = 0; i < response.actividad.length; i++) {
                if (response.actividad[i] != null)
                  this.arrActividades.push(response.actividad[i]);
              }
            }

            //Almacenar los colaboradores
            if (response.colaborador.length > 0) {
              for (var i = 0; i < response.colaborador.length; i++) {
                if (response.colaborador[i] != null)
                  this.arrColaboradores.push(response.colaborador[i]);
              }
            }

            //Almacenar las jornadas
            if (response.Jornada.length > 0) {
              for (var i = 0; i < response.Jornada.length; i++) {
                if (response.Jornada[i] != null)
                  this.arrJornadas.push(response.Jornada[i]);
              }
            }

            //Almacenar los expositores
            if (response.expositor.length > 0) {
              for (var i = 0; i < response.expositor; i++) {
                if (response.expositor[i] != null)
                  this.arrExpositores.push(response.expositor[i]);
              }
            }

            //Almacenar los datos del evento
            this.evento = response.evento;
          }
        },
        error => {
          console.log(error);
        })
    })

  }

  @ViewChild('content') content:ElementRef;
  downloadPDF() {
    
  //   const elementToPrint = document.getElementById('pdf'); //The html element to become a pdf
  //   const pdf = new jsPDF('auto', 'px', 'a4');
  //   pdf.addHTML(elementToPrint, () => {
  //     pdf.save('web.pdf');
  // });

  let doc = new jsPDF();
  let ElementHandlers = {
    '#editor': function(element, renderer){
      return true;
    }
  };
let content = this.content.nativeElement;
doc.fromHTML(content.innerHTML,15,15,{
  'width': 100,
  'left': 200,
  'elment':ElementHandlers
});
doc.save('web.pdf');
}
}
