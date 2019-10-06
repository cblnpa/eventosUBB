import { Component, OnInit } from '@angular/core';
import { ModalService, ColaboradorService, UserService } from '../../../../servicios/servicio.index';
import { colaborador, tipoColaborador } from '../../../../model/model.index';
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
    this.colaboradorAdd = new colaborador('', '', null, '', '', '',null,null);
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() {
    this.getTipoColaboradores();
  }

  getTipoColaboradores(){
    this.colaboradorService.getTipoColaboradores().subscribe(
      response => {
        this.tipoColaboradores = response.tipoColaborador;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal() {
    this.modalService.ocultarModal();
  }

  agregarColaborador(form) {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.colaboradorAdd.evento_idEvento = id;
        console.log(this.colaboradorAdd);
        this.colaboradorService.guardarColaborador(this.colaboradorAdd).subscribe(
          response => {
            console.log(response);
            Swal.fire({
              type: 'success',
              title: 'Creado con éxito',
              text: 'Se ha agregado un colaborador sin ningún problema',
            })
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
