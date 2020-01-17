import { Component, OnInit } from '@angular/core';
import { UserService, ReportesService, UnidadService } from '../../../servicios/servicio.index';
import { unidad } from 'src/app/model/model.index';

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
  public tituloUnidad = 'REPORTES UNIDAD';
  public subtituloUnidad = 'El reporte generado contiene la información asociada a todos los eventos realizados en la unidad de Ingeniería Civil en Informática, se listan todos los eventos correspondientes, indicando el encargado del evento, la fecha de realización, la cantidad de participantes, dependencia e integrantes de la comisión.'

  public hideTable; // oculta la tabla y el botón exportar para escoger primero un evento
  public nombreUnidad;

  public dataAdminUBB = [];
  public dataAdminUnidad = [];
  public dataComision = [];

  public logo = "../../../../assets/images/logo-completo-ubb.png";

  //variables para el select unidad 
  public unidad: unidad;
  public unidades: any = []; //almacena las unidades encontradas 
  public optionsUnidad;

  //Configuraciones del ngx-select-dropdown para la unidad
  configUnidad = {
    displayKey: 'nombreUnidad', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '100px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Seleccionar unidad', // text to be displayed when no item is selected defaults to Select,
    noResultsFound: '¡No se encuentra la unidad!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Buscar unidad', // label thats displayed in search input,
    searchOnKey: 'nombreUnidad' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  constructor(private userService: UserService, private reporteService: ReportesService,
    private unidadService: UnidadService) {
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
    this.hideTable = 0;
  }

  ngOnInit() {
    this.perfil = this.identity.perfil_idPerfil;
    this.getPerfil();
    this.getReportesUBB();
    this.getUnidades();
  }

  getPerfil() {
    this.idPerfil = this.identity.perfil_idPerfil;
  }

  getUnidades() {
    this.unidadService.getUnidades2().subscribe(
      response => {
        this.optionsUnidad = response.unidades;
      },
      error => {
        console.log(<any>error);
      })
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

  seleccionarUnidad() {
    this.hideTable = 1;
    this.nombreUnidad = this.unidades.nombreUnidad;
    this.dataAdminUnidad = [];
    this.getReportesUnidad();
  }

  seleccionarUnidad2() {
    this.hideTable = 0;
    this.dataAdminUnidad = [];
    this.getReportesUnidad();
  }

  getReportesUnidad() {
    this.reporteService.getReporteAdminUnidad(this.nombreUnidad).subscribe(
      response => {
        console.log(response);
        for (var i = 0; i < response.reporte.length; i++) {
          if (response.reporte[i] != null && response.reporte[i].evento.nombreEvento != null) {
            this.dataAdminUnidad.push(response.reporte[i]);
          }
          // for (var j = 0; j < response.reporte[i].comision.length; j++) {
          //   if (response.comision[i] == null)
          //     this.dataComision.push('');
          //   this.dataComision.push(response.reporte[i].comision[j].users);
          // }
        }
        console.log(this.dataAdminUnidad);
        console.log(this.dataComision);
      })
  }

  downloadAdminUBB() {
    var today = new Date();
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var fecha = 'Reporte generado el ' + date + ' a las ' + time;

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
    var totalPagesExp = '{total_pages_count_string}'

    //agregar logo
    let logoUBB = document.getElementById('logoUBB');
    docAdminUBB.addImage(logoUBB, 'PNG', 120, 5);

    //configuración título
    docAdminUBB.setFontSize(16);
    docAdminUBB.text(this.tituloUBB, 95, 45);

    //SplitText separa las frases extensas para dejarlas como párrafos
    var lines = docAdminUBB.splitTextToSize(this.subtituloUBB, 400);
    docAdminUBB.setFontSize(10);
    docAdminUBB.text(lines, 15, 52);

    //configuración de la tabla
    docAdminUBB.setFontSize(12);
    docAdminUBB.autoTable(columns, dataUBB, {
      margin: { top: 60 },
      didDrawPage: function (data) {
        data.settings.margin.top = 15; //resetea el margen de la siguiente página

        var pageSize = docAdminUBB.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

        //header
        docAdminUBB.setFontSize(9);
        docAdminUBB.text(fecha, data.settings.margin.left, pageHeight - 205);

        //footer
        var str = 'Página ' + docAdminUBB.internal.getNumberOfPages();
        if (typeof docAdminUBB.putTotalPages === 'function') {
          str = str + ' de ' + totalPagesExp;
        }
        docAdminUBB.setFontSize(9);

        //Agrega el footer
        docAdminUBB.text(str, data.settings.margin.left, pageHeight - 10);
      }
    });

    //Obtiene el total de páginas
    if (typeof docAdminUBB.putTotalPages === 'function') {
      docAdminUBB.putTotalPages(totalPagesExp)
    }

    docAdminUBB.save('reporte.pdf');
  }

  downloadAdminUnidad() {
    var today1 = new Date();
    var date1 = today1.getFullYear() + '/' + (today1.getMonth() + 1) + '/' + today1.getDate();
    var time1 = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
    var fecha1 = 'Reporte generado el ' + date1 + ' a las ' + time1;

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
      rowsAdminUnidad.encargado = this.dataAdminUnidad[i].encargado.nombreUsuario + ' ' + this.dataAdminUnidad[i].encargado.apellidoUsuario;
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
    var totalPagesExp = '{total_pages_count_string}'

    //agregar logo
    let logoUBB = document.getElementById('logoUBB');
    docAdminUnidad.addImage(logoUBB, 'PNG', 120, 5);

    //título
    docAdminUnidad.setFontSize(16);
    docAdminUnidad.text(this.tituloUnidad, 115, 45);
    
    docAdminUnidad.setFontSize(14);
    docAdminUnidad.text(this.nombreUnidad,15,50);

    //subtitulo
    var line1 = docAdminUnidad.splitTextToSize(this.subtituloUnidad, 350);
    docAdminUnidad.setFontSize(10);
    docAdminUnidad.text(line1,15,55);

    //configuración de la tabla
    docAdminUnidad.setFontSize(12);
    docAdminUnidad.autoTable(columnsUnidad, dataUnidad, {
      margin: { top: 65 },
      didDrawPage: function (data) {
        data.settings.margin.top = 15;

        var pageSize = docAdminUnidad.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

        //header
        docAdminUnidad.setFontSize(9);
        docAdminUnidad.text(fecha1, data.settings.margin.left, pageHeight - 205);

        //footer
        var str = 'Página ' + docAdminUnidad.internal.getNumberOfPages();
        if(typeof docAdminUnidad.putTotalPages === 'function') {
          str = str + ' de ' + totalPagesExp;
        }
        docAdminUnidad.setFontSize(9);
        docAdminUnidad.text(str, data.settings.margin.left, pageHeight - 10);
      }
    });

    //Obtiene el total de páginas
    if (typeof docAdminUnidad.putTotalPages === 'function') {
      docAdminUnidad.putTotalPages(totalPagesExp)
    }

    docAdminUnidad.save('reporte.pdf');
  }

}
