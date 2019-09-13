import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';
import Swal from 'sweetalert2';

//mis importaciones
import { EventoUsersService, EventoPojoService, ComisionService } from '../../../servicios/servicio.index';

import 'fabric';
import { $ } from 'protractor';
declare const fabric: any;

@Component({
  selector: 'app-generar-utilidades',
  templateUrl: './generar-utilidades.component.html',
  styleUrls: ['./generar-utilidades.component.css']
})
export class GenerarUtilidadesComponent implements OnInit {

  public canvas: any;
  public props: any = {
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    TextDecoration: ''
  };
  public textString: string;
  public url: string = '';
  public size: any = {
    width: 500,
    height: 500
  };
  public json: any;
  public globalEditor: boolean = false;
  public textEditor: boolean = false;
  public imageEditor: boolean = false;
  public figureEditor: boolean = false;
  public selected: any;

  //Mis variables
  public idEvento; //obtenido por parámetro; id del evento a trabajar
  public tipoUtilidad; //obtenido por parámetro; diploma-credencial-certificado
  public participantes; //almacena los participantes del evento para generar diplomas y certificados
  public expositores; //almacena los expositores del evento para generar diplomas
  public colaboradores; //almacena los colaboradores para generar diplomas
  public comision; //almacena los integrantes de la comision para generar las credenciales

  public texto: string; //similar al textString

  constructor(private route: ActivatedRoute, private eventoService: EventoPojoService,
    private comisionService: ComisionService, private eventoUsersService: EventoUsersService) { }

  ngOnInit() {
    //setup front side canvas
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });

    this.canvas.on({
      'object:moving': (e) => { },
      'object:modified': (e) => { },
      'object:selected': (e) => {

        let selectedObject = e.target;
        this.selected = selectedObject
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        // selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';
        this.resetPanels();
        if (selectedObject.type !== 'group' && selectedObject) {
          this.getId();
          this.getOpacity();
          switch (selectedObject.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              this.figureEditor = true;
              this.getFill();
              break;
            case 'i-text':
              this.textEditor = true;
              this.getLineHeight();
              this.getCharSpacing();
              this.getBold();
              this.getFontStyle();
              this.getFill();
              this.getTextDecoration();
              this.getTextAlign();
              this.getFontFamily();
              break;
            case 'image':
              console.log('image');
              break;
          }
        }
      },
      'selection:cleared': (e) => {
        this.selected = null;
        this.resetPanels();
      }
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);

    this.cargarDatos();
  }

  //Mostrar cosas que paso por parámetro
  cargarDatos() {
    this.route.params.subscribe(params => {
      //Asignar el id del evento y el tipo de utilidad para ocultar y mostrar
      this.idEvento = +params['id'];
      this.tipoUtilidad = params['tipo'];
    })

    // Obtener los participantes del evento
    this.eventoUsersService.getEventoUsersById(this.idEvento).subscribe(
      //comprobar si está vacío && retorna "success"
      response => {
        if (response.code == 200 && (response.evento.length) > 0) {
          this.participantes = response.evento;
          console.log('participantes:');
          console.log(this.participantes);
        } else {
          console.log('aún no hay participantes en este evento');
          this.participantes = '';
        }
      },
      error => {
        console.log(<any>error);
      }
    );

    //Obtener expositores,colaboradores del evento
    this.eventoService.getEventoPojoById(this.idEvento).subscribe(
      response => {
        //Expositores
        if (response.code == 200 && (response.expositor.length) > 0) {
          this.expositores = response.expositor;
          console.log('expositores');
          console.log(this.expositores);
        } else {
          console.log('aún no hay expositores en este evento');
          this.expositores = '';
        }

        //Colaboradores
        if (response.code == 200 && response.colaborador != null) {
          this.colaboradores = response.colaborador;
          console.log('colaboradores');
          console.log(this.colaboradores);
        } else {
          console.log('aún no hay colaboradores en este evento');
          this.colaboradores = '';
        }
      },
      error => {
        console.log(<any>error);
      }
    );

    //Obtener integrantes de la comisión del evento
    this.comisionService.getComisiones(this.idEvento).subscribe(
      response => {
        if (response.code == 200 && (response.comisiones.length) > 0) {
          this.comision = response.comisiones;
        } else {
          console.log('aún no hay integrantes en la comisión');
          this.comision = '';
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  //Cambiar tamaño del canvas
  changeSize(event: any) {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  //Block "Add text"
  addText() {
    let textString = this.textString;
    let text = new fabric.IText(textString, {
      left: 10,
      top: 10,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true
    });
    this.extend(text, this.randomId());
    this.canvas.add(text);
    this.selectItemAfterAdded(text);
    this.textString = '';
  }

  addText2() {
    console.log(this.texto);
    
  }

  //Block "Add images"
  getImgPolaroid(event: any) {
    let el = event.target;
    fabric.Image.fromURL(el.src, (image) => {
      image.set({
        left: 10,
        top: 10,
        angle: 0,
        padding: 10,
        cornersize: 10,
        hasRotatingPoint: true,
        peloas: 12
      });
      image.setWidth(150);
      image.setHeight(150);
      this.extend(image, this.randomId());
      this.canvas.add(image);
      this.selectItemAfterAdded(image);
    });
  }

  //Block "Upload Image"
  addImageOnCanvas(url) {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornersize: 10,
          hasRotatingPoint: true
        });
        image.setWidth(200);
        image.setHeight(200);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        this.url = event.target['result'];
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeWhite(url) {
    this.url = '';
  };

  //Block "Add figure"
  addFigure(figure) {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: '#3f51b5'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: 10, top: 10, fill: '#2196f3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10, fill: '#ff5722'
        });
        break;
    }
    this.extend(add, this.randomId());
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
  }

  /*Canvas*/
  cleanSelect() {
    this.canvas.deactivateAllWithDispatch().renderAll();
  }

  selectItemAfterAdded(obj) {
    this.canvas.deactivateAllWithDispatch().renderAll();
    this.canvas.setActiveObject(obj);
  }

  setCanvasFill() {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
    }
  }

  extend(obj, id) {
    obj.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id
        });
      };
    })(obj.toObject);
  }

  setCanvasImage() {
    let self = this;
    if (this.props.canvasImage) {
      this.canvas.setBackgroundColor({ source: this.props.canvasImage, repeat: 'repeat' }, function () {
        // self.props.canvasFill = '';
        self.canvas.renderAll();
      });
    }
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  /*------------------------Global actions for element------------------------*/

  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
  }


  setActiveStyle(styleName, value, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
      var style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    }
    else {
      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }


  getActiveProp(name) {
    var object = this.canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
  }

  setActiveProp(name, value) {
    var object = this.canvas.getActiveObject();
    if (!object) return;
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  clone() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  getId() {
    this.props.id = this.canvas.getActiveObject().toObject().id;
  }

  setId() {
    let val = this.props.id;
    let complete = this.canvas.getActiveObject().toObject();
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  }

  getOpacity() {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity() {
    this.setActiveStyle('opacity', parseInt(this.props.opacity) / 100, null);
  }

  getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill() {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  getLineHeight() {
    this.props.lineHeight = this.getActiveStyle('lineHeight', null);
  }

  setLineHeight() {
    this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
  }

  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  getFontSize() {
    this.props.fontSize = this.getActiveStyle('fontSize', null);
  }

  setFontSize() {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize), null);
  }

  getBold() {
    this.props.fontWeight = this.getActiveStyle('fontWeight', null);
  }

  setBold() {
    this.props.fontWeight = !this.props.fontWeight;
    this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
  }

  getFontStyle() {
    this.props.fontStyle = this.getActiveStyle('fontStyle', null);
  }

  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
  }

  getTextDecoration() {
    this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
  }

  setTextDecoration(value) {
    let iclass = this.props.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, "g"), "");
    } else {
      iclass += ` ${value}`
    }
    this.props.TextDecoration = iclass;
    this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
  }

  hasTextDecoration(value) {
    return this.props.TextDecoration.includes(value);
  }

  getTextAlign() {
    this.props.textAlign = this.getActiveProp('textAlign');
  }

  setTextAlign(value) {
    this.props.textAlign = value;
    this.setActiveProp('textAlign', this.props.textAlign);
  }

  getFontFamily() {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  setFontFamily() {
    this.setActiveProp('fontFamily', this.props.fontFamily);
  }

  /*System*/


  removeSelected() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      let self = this;
      objectsInGroup.forEach(function (object) {
        self.canvas.remove(object);
      });
    }
  }

  bringToFront() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.bringToFront();
      // activeObject.opacity = 1;
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  }

  sendToBack() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.sendToBack();
      // activeObject.opacity = 1;
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  }

  confirmClear() {
    Swal.fire({
      title: '¿Quiere limpiar la zona de trabajo?',
      text: "Si acepta se perderán todos los cambios",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero limpiar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '¡Ya hemos limpiado la zona de trabajo!'
        )
        this.canvas.clear();
      }
    })

    // if (confirm('¿Está seguro de limpiar la pantalla?')) {
    //   this.canvas.clear();
    // }
  }

  rasterize() {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
      console.log(this.canvas.toDataURL('png'))
      //window.open(this.canvas.toDataURL('png'));
      var image = new Image();
      image.src = this.canvas.toDataURL('png')
      var w = window.open("");
      w.document.write(image.outerHTML);
    }
  }

  downloadPDF() {
    let a: any = document.getElementById('canvas');
    var doc = new jsPDF({
      orientation: 'auto',
      unit: 'px',
      format: [this.size.width, this.size.height]
    });

    doc.addImage(a, 'JPEG', 0, 0, a.width, a.height);
    doc.save('testCanvas.pdf');
  }

  rasterizeSVG() {
    console.log(this.canvas.toSVG())
    // window.open(
    //   'data:image/svg+xml;utf8,' +
    //   encodeURIComponent(this.canvas.toSVG()));
    // console.log(this.canvas.toSVG())
    // var image = new Image();
    // image.src = this.canvas.toSVG()
    var w = window.open("");
    w.document.write(this.canvas.toSVG());
  };


  saveCanvasToJSON() {
    let json = JSON.stringify(this.canvas);
    localStorage.setItem('Kanvas', json);
    console.log('json');
    console.log(json);

  }

  loadCanvasFromJSON() {
    let CANVAS = localStorage.getItem('Kanvas');
    console.log('CANVAS');
    console.log(CANVAS);

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {
      console.log('CANVAS untar');
      console.log(CANVAS);

      // making sure to render canvas at the end
      this.canvas.renderAll();

      // and checking if object's "name" is preserved
      console.log('this.canvas.item(0).name');
      console.log(this.canvas);
    });

  };

  rasterizeJSON() {
    this.json = JSON.stringify(this.canvas, null, 2);
  }

  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }

}
