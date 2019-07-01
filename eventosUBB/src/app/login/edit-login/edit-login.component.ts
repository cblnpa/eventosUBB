import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { UserService } from '../../servicios/servicio.index';
import { users } from '../../model/users';
import {global} from '../../servicios/global'

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
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .jpeg, .gif",
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
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
};
  constructor( private userService: UserService, private router: Router, private title: Title ) { 
    this.user = new users('','','','',''); 
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    //rellena objeto usuario
    this.user = new users (
      this.identity.nombreUsuario,
      this.identity.apellidoUsuario,
      this.identity.email,
      this.identity.password,
      this.identity.avatar,
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
    this.userService.update(this.token, this.user).subscribe(
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
          if(response.changes.password){
            this.user.password = response.changes.password;
          }
          if(response.changes.avatar){
            this.user.avatar = response.changes.avatar;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        }

      },
      error =>{
        this.status='error';
          console.log(<any>error);
      }
    );
  }

}
