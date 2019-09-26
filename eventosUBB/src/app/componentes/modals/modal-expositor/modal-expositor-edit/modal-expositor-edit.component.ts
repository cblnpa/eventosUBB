import { Component, OnInit } from '@angular/core';
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
    this.expositorService.getExpositorById(1).subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log(<any>error);
      }
    )

    // this.route.params.subscribe(
    //   params => {
    //     let idEvento = +params['id'];
    //     this.idEvento = idEvento;

    //     this.expositorService.getExpositoresActividad(this.idEvento).subscribe(
    //       response => {
    //         this.expositores = response.expositor[0];
    //         this.expositores = new expositor(this.expositores.nombreExpositor, this.expositores.apellidoExpositor,
    //           this.expositores.apellido2Expositor, this.expositores.sexo, this.expositores.correoExpositor,
    //           this.expositores.empresa, this.expositores.foto, this.expositores.telefonoExpositor,
    //           this.expositores.evento, this.expositores.idExpositor);
    //       }, error => {
    //         console.log(<any>error);
    //       })
    //   })
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal() {
    this.modalService.ocultarModal();
  }

  editarExpositor(form) {
    this.expositorService.editExpositor(this.expositores, this.expositores.idExpositor).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          type: 'success',
          title: 'Creado con éxito',
          text: 'Se ha creado la jornada sin ningún problema',
        })
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

}
