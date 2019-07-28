import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UserService } from '../../servicios/servicio.index';
import { users } from '../../model/users';
import { global } from '../../servicios/global'
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-edit-login',
  templateUrl: './edit-login.component.html',
  styleUrls: ['./edit-login.component.css'],
  providers: [ UserService ]

})
export class EditLoginComponent implements OnInit {
  
  titulo: string;

  public user: users;
  public status: string;
  public identity;
  public token;
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

  constructor( private userService: UserService, private router: Router, private title: Title ) { 
    this.user = new users('','','','','',null,null); 
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = global.url;
    //rellena objeto usuario
    this.user = new users (
      this.identity.nombreUsuario,
      this.identity.apellidoUsuario,
      this.identity.email,
      this.identity.password,
      this.identity.avatar,
      this.identity.verified,
      this.identity.sub
    );
    this.getDataRoute()
    .subscribe( data => {
      console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle('EventosUBB - ' + this.titulo);
    });

  }

  ngOnInit() {
    init_plugins();
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd ),
      filter( (evento:ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento:ActivationEnd) => evento.snapshot.data )
    )
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
          if(response.changes.email){
            this.user.email = response.changes.email;
          }
      
          if(response.changes.avatar){
            this.user.avatar = response.changes.avatar;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          Swal.fire({
            type: 'success',
            title: 'Imagen agregada exitosamente'
          })

          this.router.navigate(['/inicio']);

        }
      },
      error =>{
        this.status='error';
        console.log(<any>error);

        Swal.fire({
          type: 'error',
          title: 'Error al agregar la imagen'
        })

      }
    );
  }

  avatarUpload(datos){
    let data =JSON.parse(datos.response);
    console.log(datos.response);
    this.user.avatar = data.image;
    console.log(this.user.avatar);
  }

}
