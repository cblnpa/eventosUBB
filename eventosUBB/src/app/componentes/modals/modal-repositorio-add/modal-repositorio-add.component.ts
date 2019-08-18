import { Component, OnInit } from '@angular/core';
import { ModalService, RepositorioService, UserService } from '../../../servicios/servicio.index';
import { repositorio } from '../../../model/repositorio';
import { ActivatedRoute } from '@angular/router';
import { global } from '../../../servicios/global';

@Component({
  selector: 'app-modal-repositorio-add',
  templateUrl: './modal-repositorio-add.component.html',
  styleUrls: ['./modal-repositorio-add.component.css']
})
export class ModalRepositorioAddComponent implements OnInit {

  public repositorioAdd: repositorio;
  public url;
  public identity;
  public token;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".pptx, .pdf, .txt, .jpg, .png",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'repo',
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

  constructor(private modalService: ModalService, private repositorioService: RepositorioService,
    private route: ActivatedRoute, private userService: UserService) {
    this.repositorioAdd = new repositorio('', null);
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() { }

  ocultarModal() {
    this.modalService.ocultarModal();
  }

  agregarArchivo(form) {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.repositorioAdd.evento_idEvento = id; 
        console.log('imprimig dentro');
        console.log(this.repositorioAdd);
        this.repositorioService.guardarRepositorio(this.repositorioAdd).subscribe(
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
    this.repositorioAdd.archivo = data.image;
  }


}
