import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService, ExpositorService, UserService } from '../../../../servicios/servicio.index';
import { expositor } from '../../../../model/model.index';
import { global } from '../../../../servicios/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-expositor-add',
  templateUrl: './modal-expositor-add.component.html',
  styleUrls: ['../../modal.css']
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
    private userService: UserService, private route: ActivatedRoute) {
    this.expositorAdd = new expositor('', '', '', '', '', '', '', null, null);
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = global.url;
  }

  ngOnInit() { }

  //Formulario para agregar expositor
  agregarExpositor(form) {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.expositorAdd.evento = id;
        this.expositorService.guardarExpositor(this.expositorAdd).subscribe(
          response => {
            if (response.code == 200) {
              Swal.fire({
                type: 'success',
                title: 'Creado con éxito',
                text: 'Se ha agregado el expositor sin ningún problema',
              })
              this.expositorService.getGeneralEmitter().subscribe(e => {
                console.log(e);
              })
            }
          },
          error => {
            console.log(<any>error);
          }
        )
        this.ocultarModal();
      });
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal() {
    this.modalService.ocultarModal();
    this.expositorAdd = new expositor('', '', '', '', '', '', '', null, null);
  }

  //foto del expositor
  fotoUpload(datos) {
    let data = JSON.parse(datos.response);
    this.expositorAdd.foto = data.image;
  }

}
