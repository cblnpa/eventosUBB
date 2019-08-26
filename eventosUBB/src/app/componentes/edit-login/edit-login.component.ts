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
  providers: [ UserService, SettingsService ]
})
export class EditLoginComponent implements OnInit {
  
  public titulo: string;
  public user: users;
  public status: string;
  public identity;
  public url;
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.jpeg,.png,.gif",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'user/upload',
      headers: {
     "Authorization" : this.userService.getToken()
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

  constructor( private userService: UserService, private router: Router, private title: Title,
    public _ajustes: SettingsService ) { 
    this.identity = this.userService.getIdentity();
    this.user = new users('','','','','',null,1,null);
    this.url = global.url;
    //rellena objeto usuario
    this.user = new users(this.identity.nombreUsuario, this.identity.apellidoUsuario, this.identity.email,
      this.identity.password, this.identity.avatar, this.identity.perfil_idPerfil, 1, this.identity.sub);
    //Obtener nombre de la página
    this.getDataRoute()
    .subscribe( data => {
      this.titulo = data.titulo;
      this.title.setTitle('EventosUBB - ' + this.titulo);
    });
  }

  ngOnInit() {
    this.colocarCheck();
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd ),
      filter( (evento:ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento:ActivationEnd) => evento.snapshot.data ))
  }

  onSubmit(form){
    this.userService.update(this.user, this.identity.sub).subscribe(
      response => {
        if(response && response.status){
          this.status = 'success';

          //Actualizar usuario de sesion
          if(response.changes.nombreUsuario){
            this.user.nombreUsuario = response.changes.nombreUsuario;
          }
          if(response.changes.apellidoUsuario){
            this.user.apellidoUsuario = response.changes.apellidoUsuario;
          }
          if(response.changes.avatar){
            this.user.avatar = response.changes.avatar;
          }
          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          Swal.fire({
            type: 'success',
            title: 'Datos modificados correctamente'
          })
          this.router.navigate(['/inicio']);
        }
      },
      error =>{
        this.status='error';
        console.log(<any>error);
        Swal.fire({
          type: 'error',
          title: 'Error al editar perfil'
        })});
  }

  avatarUpload(datos){
    let data =JSON.parse(datos.response);
    this.user.avatar = data.image;
  }

  cambiarColor(tema: string, linkTema: any){
    this.aplicarCheck(linkTema);
    this._ajustes.aplicarTema(tema);
  }

  //muestra el chek en la caja que selecciono
  aplicarCheck(linkTema: any) {
    //Arreglo de selectores
    let selectores: any = document.getElementsByClassName('selector');
    for( let ref of selectores){
      ref.classList.remove('working');
    }
    linkTema.classList.add('working');
  }

  //muestra el check con el tema del usuario
  colocarCheck(){
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    for( let ref of selectores){
      if( ref.getAttribute('data-theme') === tema ){
        ref.classList.add('working');
        break;
      }}}

}
