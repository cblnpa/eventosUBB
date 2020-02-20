import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService, SettingsService } from '../../servicios/servicio.index';
import { users } from '../../model/users';
import { global } from '../../servicios/global'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-login',
  templateUrl: './edit-login.component.html',
  styleUrls: ['./edit-login.component.css'],
  providers: [UserService, SettingsService]
})
export class EditLoginComponent implements OnInit {

  public titulo: string;
  public user: users;
  public status: string;
  public idUsuario;
  public identity;
  public url;

  public tema; //almacena el nombre del tema 


  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.jpeg,.png,.gif",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'user/upload',
      headers: {
        "Authorization": this.userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'sube avatar',
    replaceTexts: {
      attachPinBtn: 'Seleccionar archivo',
      afterUploadMsg_success: 'Archivo seleccionado exitosamente'
    }
  };

  constructor(private userService: UserService, private router: Router, private title: Title,
    public _ajustes: SettingsService) {
    this.identity = this.userService.getIdentity();
    this.user = new users('', '', '', '', '', this.identity.perfil_idPerfil, 1, '', this.idUsuario);
    this.url = global.url;
    this.getIdUsuario();
    //rellena objeto usuario
    this.user = new users(this.identity.nombreUsuario, this.identity.apellidoUsuario, this.identity.email,
      this.identity.password, this.identity.avatar, this.identity.perfil_idPerfil, 1, 'tema', this.idUsuario);

    //Obtener nombre de la página
    this.getDataRoute().subscribe(data => {
      this.titulo = data.titulo;
      this.title.setTitle('EventosUBB - ' + this.titulo);
    });
  }

  ngOnInit() {
    this.colocarCheck();
    this.getIdUsuario();
  }

  getIdUsuario() {
    if (!this.identity.id)
      this.idUsuario = this.identity.sub;
    else
      this.idUsuario = this.identity.id;
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data))
  }

  onSubmit(form) {
    this.userService.update(this.user, this.identity.sub).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          this.status = 'success';
          
          if (response.changes.nombreUsuario) {
            this.user.nombreUsuario = response.changes.nombreUsuario;
          }
          if (response.changes.apellidoUsuario) {
            this.user.apellidoUsuario = response.changes.apellidoUsuario;
          }
          if (response.changes.avatar) {
            this.user.avatar = response.changes.avatar;
          }
          
          this.user.tema_usuario = this.tema;

          console.log(this.user);

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          Swal.fire({
            type: 'success',
            title: 'Datos modificados correctamente'
          });

          this.router.navigate(['/inicio']);
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
        Swal.fire({
          type: 'error',
          title: 'Error al editar perfil'
        })
      });
  }

  avatarUpload(datos) {
    let data = JSON.parse(datos.response);
    this.user.avatar = data.image;
  }

  cambiarColor(tema: string, linkTema: any) {
    this.aplicarCheck(linkTema);
    this._ajustes.aplicarTema(tema);
    this.tema = tema;
  }

  salir(){
    Swal.fire({
      title: '¿Está seguro que desea salir?',
      text: "Al salir, no se guardará ningún cambio",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03C303',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero salir',
      cancelButtonText: 'No, no quiero salir'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/inicio']);
      }
    })
  }

  //muestra el chek en la caja que selecciono
  aplicarCheck(linkTema: any) {
    //Arreglo de selectores
    let selectores: any = document.getElementsByClassName('selector');
    for (let ref of selectores) {
      ref.classList.remove('working');
    }
    linkTema.classList.add('working');
  }

  //muestra el check con el tema del usuario
  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
