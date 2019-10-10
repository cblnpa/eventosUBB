import { Component, OnInit, Input } from '@angular/core';
import { ModalService, MaterialService, UserService } from '../../../../servicios/servicio.index';
import { material } from 'src/app/model/material';
import { global } from '../../../../servicios/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-material-edit',
  templateUrl: './modal-material-edit.component.html',
  styleUrls: ['../../modal.css']
})
export class ModalMaterialEditComponent implements OnInit {

  public material: material;
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

  @Input() idMaterialEdit: number; //recibe el id del material a editar

  constructor(private modalService: ModalService, private materialService: MaterialService,
    private userService: UserService) {
    this.material = new material('', '', null);
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() {
    this.getDatosMaterial();
  }

  getDatosMaterial() {
    this.materialService.getMaterialById(this.idMaterialEdit).subscribe(
      response => {
        this.material = response.material;
        //Cargar los datos del material en el modal
        this.material = new material(this.material.nombreMaterial, this.material.archivo,
          this.material.evento_idEvento, this.material.idMaterial);
      }, error => {
        console.log(<any>error);
      })
  }

  editarMaterial(form) {
    this.materialService.editMaterial(this.material, this.material.idMaterial).subscribe(
      response => {
        if (response) {
          console.log(response);
          Swal.fire({
            title: 'Material editado',
            type: 'success'
          })
          this.materialService.getGeneralEmitter().subscribe(edit => {
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
    this.getDatosMaterial();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal() {
    this.modalService.ocultarModal();
    this.getDatosMaterial();
  }

  //archivo
  archivoUpload(datos) {
    let data = JSON.parse(datos.response);
    console.log('data');
    console.log(data);
    this.material.archivo = data.image;
  }

}
