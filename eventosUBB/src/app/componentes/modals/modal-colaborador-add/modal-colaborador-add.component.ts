import { Component, OnInit } from '@angular/core';
import { ModalService, ColaboradorService, UserService } from '../../../servicios/servicio.index';
import { colaborador } from '../../../model/colaborador';
import { ActivatedRoute } from '@angular/router';
import { global } from '../../../servicios/global';

@Component({
  selector: 'app-modal-colaborador-add',
  templateUrl: './modal-colaborador-add.component.html',
  styleUrls: ['./modal-colaborador-add.component.css']
})
export class ModalColaboradorAddComponent implements OnInit {

  public colaboradorAdd: colaborador;
  private url;
  private token;
  private identity;

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

  constructor(private modalService: ModalService, private colaboradorService: ColaboradorService,
    private route: ActivatedRoute, private userService: UserService) {
    this.colaboradorAdd = new colaborador('', '', null, '', '', '', null);
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() {
  }

  ocultarModal() {
    this.modalService.ocultarModal();
  }

  agregarColaborador(form) {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.colaboradorAdd.evento_idEvento = id;
        this.colaboradorService.guardarColaborador(this.colaboradorAdd).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(<any>error);
          })
      })
    this.ocultarModal();
  }

  //logo del colaborador
  logoUpload(datos) {
    let data = JSON.parse(datos.response);
    this.colaboradorAdd.logo = data.image;
  }

}
