import { Component, OnInit } from '@angular/core';
import { ModalService, MaterialService, UserService } from '../../../servicios/servicio.index';
import { material } from '../../../model/material';
import { ActivatedRoute } from '@angular/router';
import { global } from '../../../servicios/global';

@Component({
  selector: 'app-modal-material-add',
  templateUrl: './modal-material-add.component.html',
  styleUrls: ['./modal-material-add.component.css']
})
export class ModalMaterialAddComponent implements OnInit {

  public materialAdd: material;
  public url;
  public identity;
  public token;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".pptx, .pdf, .txt",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'materiales/upload',
      headers: {
        "Authorization": this.userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      attachPinBtn: 'Seleccionar archivo',
      afterUploadMsg_success: 'Archivo seleccionado exitosamente'
    }
  };

  constructor( private modalService: ModalService, private materialService: MaterialService, 
    private route: ActivatedRoute, private userService: UserService ) {
      this.materialAdd = new material('','',null);
      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();
     }

  ngOnInit() {
  }

  ocultarModal(){
    this.modalService.ocultarModal();
  }

  //Formulario para agregar material
  agregarMaterial(form){
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.materialAdd.evento_idEvento = id;
        this.materialService.guardarMaterial(this.materialAdd).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(<any>error);
          }
        )})
        this.ocultarModal();
  }

  //archivo
  archivoUpload(datos) {
    let data = JSON.parse(datos.response);
    console.log('data');
    console.log(data);
    this.materialAdd.archivo = data.image;
  }

}
