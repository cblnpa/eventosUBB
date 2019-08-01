import { Component, OnInit } from '@angular/core';
import { ModalService, ExpositorService, UserService } from '../../../servicios/servicio.index';
import { expositor } from '../../../model/expositor';
import { global } from '../../../servicios/global';

@Component({
  selector: 'app-modal-expositor-add',
  templateUrl: './modal-expositor-add.component.html',
  styleUrls: ['./modal-expositor-add.component.css']
})
export class ModalExpositorAddComponent implements OnInit {

  public expositorAdd: expositor;
  public url;
  public identity;
  public token;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.jpeg,.png,.gif",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'upload',
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

  constructor(private modalService: ModalService, private expositorService: ExpositorService,
    private userService: UserService) {
    this.url = global.url;
    this.expositorAdd = new expositor('', '', '', '', '', '');
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() {
  }

  ocultarModal() {
    this.modalService.ocultarModal();
  }

  //Formulario para agregar expositor
  agregarExpositor(form) {
    this.expositorService.guardarExpositor(this.expositorAdd).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
    this.ocultarModal();
  }

  //foto del expositor
  fotoUpload(datos) {
    let data = JSON.parse(datos.response);
    this.expositorAdd.foto = data.image;
  }

}
