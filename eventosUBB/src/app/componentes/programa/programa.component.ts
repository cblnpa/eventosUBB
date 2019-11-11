import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoPojoService } from '../../servicios/servicio.index';
// import * as jsPDF from 'jspdf';

declare const require: any;
const jsPDF = require('jspdf');
require ('jspdf-autotable');

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
  public evento = [];
  public fechas = [];
  public fechaEvento;

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
            var primeraFecha = '';
            if (response.Jornada.length > 0) {
              for (var i = 0; i < response.Jornada.length; i++) {
                if (response.Jornada[i] != null) {
                  this.arrJornadas.push(response.Jornada[i]);
                  this.fechas.push(response.Jornada[i].fechaJornada);
                }
              }
            }
            //Seleccionar la fecha más pronta de las jornadas
            for (var i = 0; i < this.fechas.length; i++) {
              if (primeraFecha < this.fechas[i])
                this.fechaEvento = this.fechas[i];
            }

            //Almacenar los expositores
            if (response.expositor.length > 0) {
              for (var i = 0; i < response.expositor.length; i++) {
                if (response.expositor[i] != null)
                  this.arrExpositores.push(response.expositor[i]);
              }
            }

            //Almacenar los datos del evento
            this.evento.push(response.evento);
            console.log(this.evento);
          }
        },
        error => {
          console.log(error);
        })
    })

  }

  @ViewChild('content') content: ElementRef;

  // downloadPDF() {

  //   //   const elementToPrint = document.getElementById('pdf'); //The html element to become a pdf
  //   //   const pdf = new jsPDF('auto', 'px', 'a4');
  //   //   pdf.addHTML(elementToPrint, () => {
  //   //     pdf.save('web.pdf');
  //   // });

  //   let doc = new jsPDF({orientation: 'p', format: 'letter', putOnlyUsedFonts: true});
  //   // let ElementHandlers = {
  //   //   '#editor': function (element, renderer) {
  //   //     return true;
  //   //   }
  //   // };
  //   let content = this.content.nativeElement;
  //   doc.fromHTML(content.innerHTML, 15, 15, {
  //     'width': 300
  //   });
  //   doc.save('web.pdf');
  // }

  // intento con jspdf autotable
  downloadPDF() {
    let columns = [
      { title: 'Hora', dataKey: 'hora' },
      { title: 'Actividad', dataKey: 'nombre'},
      { title: 'Descripción', dataKey: 'descripcion' }
    ]

    //data o contenido de la tabla
    let data = [];
    let rows = { horaInicio: '', horaFin: '', nombre: '' ,descripcion: '' };

    for (var i = 0; i < this.arrActividades.length; i++) {
      rows.horaInicio = this.arrActividades[i].horaInicioActividad;
      rows.horaFin = this.arrActividades[i].horaFinActividad;
      rows.descripcion = this.arrActividades[i].descripcionActividad;
      rows.nombre = this.arrActividades[i].nombreActividad;

      data.push({ 'hora': rows.horaInicio + ' - ' + rows.horaFin, 'nombre': rows.nombre, 'descripcion': rows.descripcion });
      // data.push(rows.horaInicio, rows.horaFin, rows.descripcion);
    }
    var doc = new jsPDF({ orientation: 'p', format: 'letter', putOnlyUsedFonts: true });
    //Configuracion para el nombre del evento
    doc.setFontSize(22);
    doc.text(this.evento[0].nombreEvento,14,20);

    //Configuracion para los datos del evento
    doc.setFontSize(16);
    doc.text('Fecha: ' + this.fechaEvento,14,30);
    doc.text('Ubicación: ' + this.evento[0].ubicacion + ', ' + this.evento[0].direccion + ', ' + this.evento[0].ciudad.nombreCiudad, 14, 40 );

    //Configuracion para la tabla con las actividades
    doc.setFontSize(12);
    doc.autoTable(columns, data, {
      columnStyles: {
        hora: {cellWidth: 27},
        nombre: {cellWidth: 30},
        descripcion: {cellWidth: 'auto'}
      },
      margin: {top: 50}
    });

    //Exportar a pdf
    doc.save('tabla.pdf');
  }
}
