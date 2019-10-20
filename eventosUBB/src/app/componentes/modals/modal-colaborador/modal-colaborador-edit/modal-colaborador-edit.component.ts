import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ModalService, ColaboradorService, UserService } from '../../../../servicios/servicio.index';
import { colaborador, tipoColaborador } from '../../../../model/model.index';
import { global } from '../../../../servicios/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-colaborador-edit',
  templateUrl: './modal-colaborador-edit.component.html',
  styleUrls: ['../../modal.css']
})
export class ModalColaboradorEditComponent implements OnInit {

  public colaborador: colaborador;
  public tipoColaboradores;

  @Input() idColaboradorEdit: number; //recibe el id del colaborador a editar

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
    private userService: UserService) {
    this.colaborador = new colaborador('', '', null, '', '', '', null, null);
  }

  ngOnInit() {
    this.getDatosColaborador();
    this.getTipoColaboradores();
  }

  ngOnChanges(changes: SimpleChanges ){
    this.colaborador.idColaborador = this.idColaboradorEdit;
    this.getDatosColaborador();
  }

  getDatosColaborador() {
    this.colaboradorService.getColaboradorById(this.idColaboradorEdit).subscribe(
      response => {
        this.colaborador = response.colaborador;
        //Cargar los datos del colaborador en el modal
        this.colaborador = new colaborador(this.colaborador.nombreColaborador, this.colaborador.nombreRepresentante,
          this.colaborador.telefonoColaborador, this.colaborador.correoColaborador, this.colaborador.sitioWeb,
          this.colaborador.logo, this.colaborador.tipoColaborador_idtipoColaborador, this.colaborador.evento_idEvento,
          this.idColaboradorEdit);
      }, error => {
        console.log(<any>error);
      }
    )
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

  editarColaborador(form) {
    this.colaboradorService.editColaborador(this.colaborador, this.colaborador.idColaborador).subscribe(
      response => {
        if(response){
          console.log(this.colaborador);
          console.log(response);
          Swal.fire({
            title: 'Colaborador editado',
            type: 'success'
          })
          this.colaboradorService.getGeneralEmitter().subscribe(edit=> {
            console.log(edit);
          })
        }
      }, error => {
        console.log(<any>error);
      })
    this.ocultarModal();
  }

  //pregunta si quiere salir del modal
  salirModal() {
    this.modalService.salirModal();
  }

  //oculta el modal luego de agregar los datos
  ocultarModal() {
    this.modalService.ocultarModal();
  }

  //logo del colaborador
  logoUpload(datos) {
    let data = JSON.parse(datos.response);
    this.colaborador.logo = data.image;
  }


}
