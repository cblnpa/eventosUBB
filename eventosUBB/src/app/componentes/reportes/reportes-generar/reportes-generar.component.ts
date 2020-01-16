import { Component, OnInit } from '@angular/core';
import { UserService, ReportesService } from '../../../servicios/servicio.index';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-reportes-generar',
  templateUrl: './reportes-generar.component.html',
  styleUrls: ['./reportes-generar.component.css']
})
export class ReportesGenerarComponent implements OnInit {

  public token;
  public identity;
  // public sinComision; //variable que muestra el texto cuando no existe una comisión en el evento
  public perfil; // id del perfil del usuario activo
  public idPerfil; //almacena el id del usuario para mostrar la tabla correspondiente
  public tituloUBB = 'REPORTES UNIVERSIDAD DEL BÍO-BÍO';
  public subtituloUBB = 'El reporte generado contiene la información asociada a todos los eventos realizados en la Universidad del Bío-Bío, se listan todas las unidades con sus eventos correspondientes, indicando el encargado del evento, la fecha de realización y la cantidad de participantes';
  public tituloUnidad = 'Reportes Administrador Unidad';
  public subtituloUnidad = 'El reporte generado contiene la información asociada a todos los eventos realizados en la unidad de Ingeniería Civil en Informática, se listan todos los eventos correspondientes, indicando el encargado del evento, la fecha de realización, la cantidad de participantes, dependencia e integrantes de la comisión.'

  public dataAdminUBB = [];
  public dataAdminUnidad = [];
  public dataComision = [];

  public logo = "../../../../assets/images/logo-completo-ubb.png";

  constructor(private userService: UserService, private reporteService: ReportesService) {
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  ngOnInit() {
    this.perfil = this.identity.perfil_idPerfil;
    this.getPerfil();
    this.getReportesUBB();
    this.getReportesUnidad();
  }

  getPerfil() {
    this.idPerfil = this.identity.perfil_idPerfil;
    console.log(this.idPerfil);
  }

  getReportesUBB() {
    this.reporteService.getReporteAdminUBB().subscribe(
      response => {
        for (var i = 0; i < response.reporte.length; i++) {
          if (response.reporte[i] != null && response.reporte[i].nombreEvento != null)
            this.dataAdminUBB.push(response.reporte[i]);
        }
      })
  }

  getReportesUnidad() {
    let nombreUnidad = 'Facultad de Ciencias Empresariales';
    this.reporteService.getReporteAdminUnidad(nombreUnidad).subscribe(
      response => {
        console.log(response);
        for (var i = 0; i < response.reporte.length; i++) {
          if (response.reporte[i] != null && response.reporte[i].evento.nombreEvento != null)
            this.dataAdminUnidad.push(response.reporte[i]);
          for (var j = 0; j < response.reporte[i].comision.length; j++) {
            if (response.reporte[i] != null && response.reporte[i].comision.length > 0 && response.reporte[i].evento.nombreEvento != null)
              this.dataComision.push(response.reporte[i].comision[j]);
          }
        }
      })
  }

  downloadAdminUBB() {
    let columns = [
      { title: 'Unidad', dataKey: 'unidad' },
      { title: 'Encargado unidad', dataKey: 'encargadoU' },
      { title: 'Evento', dataKey: 'evento' },
      { title: 'Encargado del evento', dataKey: 'encargadoE' },
      { title: 'Fecha del evento', dataKey: 'fecha' },
      { title: 'Cupos', dataKey: 'participantes' },
      { title: 'Ciudad', dataKey: 'ciudad' },
    ]

    //data o contenido de la tabla
    let dataUBB = [];
    let rowsAdminUBB = { unidad: '', encargadoUnidad: '', nombreEvento: '', encargadoEvento: '', fechaEvento: '', cantidadParticipantes: '', nombreCiudad: '' };

    for (var i = 0; i < this.dataAdminUBB.length; i++) {
      rowsAdminUBB.unidad = this.dataAdminUBB[i].nombreUnidad;
      rowsAdminUBB.encargadoUnidad = this.dataAdminUBB[i].encargadoUnidad;
      rowsAdminUBB.nombreEvento = this.dataAdminUBB[i].nombreEvento;
      rowsAdminUBB.encargadoEvento = this.dataAdminUBB[i].encargadoEvento;
      rowsAdminUBB.fechaEvento = this.dataAdminUBB[i].fechaEvento.created_at;
      rowsAdminUBB.cantidadParticipantes = this.dataAdminUBB[i].cantidadParticipante;
      rowsAdminUBB.nombreCiudad = this.dataAdminUBB[i].ciudad.ciudad.nombreCiudad;

      dataUBB.push({
        'unidad': rowsAdminUBB.unidad, 'encargadoU': rowsAdminUBB.encargadoUnidad,
        'evento': rowsAdminUBB.nombreEvento, 'encargadoE': rowsAdminUBB.encargadoEvento,
        'fecha': rowsAdminUBB.fechaEvento, 'participantes': rowsAdminUBB.cantidadParticipantes,
        'ciudad': rowsAdminUBB.nombreCiudad
      });
    }

    //acá va la configuración del PDF
    var docAdminUBB = new jsPDF({ orientation: 'landscape', format: 'letter', putOnlyUsedFonts: true });

    //agregar logo
    let logoUBB = document.getElementById('logoUBB');
    docAdminUBB.addImage(logoUBB,'PNG',120,5);

    //configuración título
    docAdminUBB.setFontSize(16);
    docAdminUBB.text(this.tituloUBB,95,45);

    //SplitText separa las frases extensas para dejarlas como párrafos
    var lines = docAdminUBB.splitTextToSize(this.subtituloUBB, 400);
    docAdminUBB.setFontSize(10);
    docAdminUBB.text(lines,15,52);

    //configuración de la tabla
    docAdminUBB.setFontSize(12);
    docAdminUBB.autoTable(columns, dataUBB, {
      margin: { top: 60 },
      didDrawPage: function (data) {
        data.settings.margin.top = 10;
      }
    });

    //pies de página
    docAdminUBB.setFontSize(9);
    docAdminUBB.text('fechaCreacion',14,200);

    docAdminUBB.save('reporte.pdf');
  }

  downloadAdminUnidad() {
    let columnsUnidad = [
      { title: 'Encargado', dataKey: 'encargado' },
      { title: 'Evento', dataKey: 'evento' },
      { title: 'Fecha del evento', dataKey: 'fecha' },
      { title: 'Comision', dataKey: 'comision' },
      { title: 'Cupos', dataKey: 'cupos' },
      { title: 'Dependencia', dataKey: 'dependencia' },
      { title: 'Ciudad', dataKey: 'ciudad' },
    ]

    //data o contenido de la tabla
    let dataUnidad = [];
    let rowsAdminUnidad = { encargado: '', evento: '', fecha: '', comision: '', cupos: '', dependencia: '', ciudad: '' };

    for (var i = 0; i < this.dataAdminUnidad.length; i++) {
      rowsAdminUnidad.encargado = this.dataAdminUnidad[i].encargado;
      rowsAdminUnidad.evento = this.dataAdminUnidad[i].evento.nombreEvento;
      rowsAdminUnidad.fecha = this.dataAdminUnidad[i].evento.created_at;
      rowsAdminUnidad.comision = 'comision'; //*
      rowsAdminUnidad.cupos = this.dataAdminUnidad[i].evento.capacidad;
      rowsAdminUnidad.dependencia = this.dataAdminUnidad[i].evento.ubicacion;
      rowsAdminUnidad.ciudad = this.dataAdminUnidad[i].evento.ciudad.nombreCiudad;

      dataUnidad.push({
        'encargado': rowsAdminUnidad.encargado, 'evento': rowsAdminUnidad.evento,
        'fecha': rowsAdminUnidad.fecha, 'comision': rowsAdminUnidad.comision,
        'cupos': rowsAdminUnidad.cupos, 'dependencia': rowsAdminUnidad.dependencia,
        'ciudad': rowsAdminUnidad.ciudad
      });
    }

    //acá va la configuración del PDF
    var docAdminUnidad = new jsPDF({ orientation: 'landscape', format: 'letter', putOnlyUsedFonts: true });
    docAdminUnidad.setFontSize(22);
    docAdminUnidad.text(this.tituloUnidad);

    docAdminUnidad.setFontSize(16);
    docAdminUnidad.text(this.subtituloUnidad);

    //configuración de la tabla
    docAdminUnidad.setFontSize(12);
    docAdminUnidad.autoTable(columnsUnidad, dataUnidad, {
      margin: { top: 50 }
    });

    docAdminUnidad.save('reporte.pdf');
  }

}
