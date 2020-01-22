import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoPojoService, ExpositorService } from '../../servicios/servicio.index';
import { CambiarHoraPipe } from '../../pipes/cambiar_hora/cambiar-hora.pipe';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

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
  public arrExpositorActividad = [];

  //acá están los datos del evento
  public evento = [];
  public fechas = [];
  public fechaEvento;

  public logo = "../../../../assets/images/logo-completo-ubb.png";

  constructor(private eventoPojoService: EventoPojoService, private route: ActivatedRoute,
    private expositorService: ExpositorService) { }

  ngOnInit() {
    this.getEventosDetalle();
  }

  getEventosDetalle() {
    this.route.params.subscribe(params => {
      //Obtener el id del evento que viene por URL
      let idEvento = +params['id'];
      this.eventoPojoService.getEventoPojoById(idEvento).subscribe(
        response => {
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
          }
        },
        error => {
          console.log(<any>error);
        })

      //Función para asignar a la actividad el expositor correspondiente 
      this.expositorService.getExpositorActividad(idEvento).subscribe(
        response => {
          if (response.code == 200) {
            for (var i = 0; i < response.expositor.length; i++) {
              if (response.expositor[i] != null)
                this.arrExpositorActividad.push(response.expositor[i]);
            }
          }
        },
        error => {
          console.log(<any>error);
        })
    })
  }

  // intento con jspdf autotable
  downloadPDF() {
    let columns = [
      { title: 'Hora', dataKey: 'hora' },
      { title: 'Actividad', dataKey: 'nombre' },
      { title: 'Descripción', dataKey: 'descripcion' }
    ]
    //data o contenido de la tabla
    let data = [];
    let rows = { horaInicio: '', horaFin: '', nombre: '', descripcion: '' };

    for (var i = 0; i < this.arrActividades.length; i++) {
      rows.horaInicio = CambiarHoraPipe.prototype.transform(this.arrActividades[i].horaInicioActividad);
      rows.horaFin = CambiarHoraPipe.prototype.transform(this.arrActividades[i].horaFinActividad);
      rows.descripcion = this.arrActividades[i].descripcionActividad;
      rows.nombre = this.arrActividades[i].nombreActividad;

      //Función para asignar a la actividad el expositor correspondiente 
      // if (this.arrActividades[i].idActividad == this.arrExpositorActividad[i].actividad_idActividad) {
      //   rows.nombre = this.arrActividades[i].nombreActividad + ' ' + this.arrExpositorActividad[i].expositor.nombreExpositor + ' ' + this.arrExpositorActividad[i].expositor.apellidoExpositor;
      // } else {
      //   rows.nombre = this.arrActividades[i].nombreActividad + 'Nada';
      // }

      data.push({ 'hora': rows.horaInicio + ' - ' + rows.horaFin, 'nombre': rows.nombre, 'descripcion': rows.descripcion });
    }
    var doc = new jsPDF({ orientation: 'p', format: 'letter', putOnlyUsedFonts: true });

    //agregar logo
    let logoUBB = document.getElementById('logoUBB');
    doc.addImage(logoUBB, 'PNG', 100, 5);

    //Configuracion para el nombre del evento
    doc.setFontSize(22);
    doc.text(this.evento[0].nombreEvento, 14, 40);

    //Configuracion para los datos del evento
    doc.setFontSize(14);
    doc.text('Fecha: ' + this.fechaEvento, 14, 50);
    doc.text('Ubicación: ' + this.evento[0].ubicacion + ', ' + this.evento[0].direccion + ', ' + this.evento[0].ciudad.nombreCiudad, 14, 60);

    //Configuracion para la tabla con las actividades
    doc.setFontSize(12);
    doc.autoTable(columns, data, {
      columnStyles: {
        hora: { cellWidth: 27 },
        nombre: { cellWidth: 30 },
        descripcion: { cellWidth: 'auto' }
      },
      margin: { top: 65 },
      didDrawPage: function (data) {
        data.settings.margin.top = 15; //resetea el margen de la siguiente página
      }
    });

    //Exportar a pdf
    doc.save('tabla.pdf');
  }
}
