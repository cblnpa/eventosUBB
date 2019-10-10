import { Component, OnInit, Input } from '@angular/core';
import { ModalService, ExpositorService, UserService } from '../../../../servicios/servicio.index';
import { ActivatedRoute } from '@angular/router';
import { expositor } from 'src/app/model/expositor';
import { global } from '../../../../servicios/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-expositor-edit',
  templateUrl: './modal-expositor-edit.component.html',
  styleUrls: ['../../modal.css']
})
export class ModalExpositorEditComponent implements OnInit {

  public expositores: expositor;
  public idEvento;
  public identity;
  public token;

  @Input() idExpositorEdit: number; //recibe el id del expositor a editar

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
    private userService: UserService, private route: ActivatedRoute) {
    this.expositores = new expositor('', '', '', '', '', '', '', null, null, null);
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() {
    this.getDatosExpositor();
  }

  getDatosExpositor() {
    this.expositorService.getExpositorById(this.idExpositorEdit).subscribe(
      response => {
        console.log(response);
        this.expositores = response.expositor;
        //Carga los datos del expositor en el modal
        this.expositores = new expositor(this.expositores.nombreExpositor, this.expositores.apellidoExpositor,
          this.expositores.apellido2Expositor, this.expositores.sexo, this.expositores.correoExpositor,
          this.expositores.empresa, this.expositores.foto, this.expositores.telefonoExpositor,
          this.expositores.evento, this.expositores.idExpositor);
      }, error => {
        console.log(<any>error);
      }
    )
  }

  editarExpositor(form) {
    this.expositorService.editExpositor(this.expositores, this.expositores.idExpositor).subscribe(
      response => {
        if( response ) {
          console.log(response);
          Swal.fire({
            type: 'success',
            title: 'Expositor editado',
          })
          this.expositorService.getGeneralEmitter().subscribe(edit => {
            console.log(edit);
          })
        }
      },
      error => {
        console.log(<any>error);
      });
    this.ocultarModal();
  }

  //foto del expositor
  fotoUpload(datos) {
    let data = JSON.parse(datos.response);
    this.expositores.foto = data.image;
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
    this.getDatosExpositor();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal() {
    this.modalService.ocultarModal();
    this.getDatosExpositor();
  }

}
