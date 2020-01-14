import { Component, OnInit } from '@angular/core';
import { ModalService, ColaboradorService, UserService } from '../../../../servicios/servicio.index';
import { colaborador } from '../../../../model/model.index';
import { ActivatedRoute } from '@angular/router';
import { global } from '../../../../servicios/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-colaborador-add',
  templateUrl: './modal-colaborador-add.component.html',
  styleUrls: ['../../modal.css']
})
export class ModalColaboradorAddComponent implements OnInit {

  public colaboradorAdd: colaborador;
  public tipoColaboradores;
  public url;
  public token;
  public identity;

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
    this.colaboradorAdd = new colaborador('', '', null, '', '', '', null, null);
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    this.getTipoColaboradores();
  }

  getTipoColaboradores() {
    this.colaboradorService.getTipoColaboradores().subscribe(
      response => {
        this.tipoColaboradores = response.tipoColaborador;
      },
      error => {
        console.log(<any>error);
      })
  }

  agregarColaborador(form) {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.colaboradorAdd.evento_idEvento = id;
        console.log(this.colaboradorAdd);
        this.colaboradorService.guardarColaborador(this.colaboradorAdd).subscribe(
          response => {
            if (response.code == 200) {
              console.log(response);
              Swal.fire({
                type: 'success',
                title: 'Creado con éxito',
                text: 'Se ha agregado un colaborador sin ningún problema',
              })
              this.colaboradorService.getGeneralEmitter().subscribe(e => {
                console.log(e);
              });
            }
          },
          error => {
            console.log(<any>error);
          })
        this.ocultarModal();
      })
  }

  //logo del colaborador
  logoUpload(datos) {
    let data = JSON.parse(datos.response);
    this.colaboradorAdd.logo = data.image;
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal() {
    this.modalService.ocultarModal();
    this.colaboradorAdd = new colaborador('', '', null, '', '', '', null, null);
  }
}
