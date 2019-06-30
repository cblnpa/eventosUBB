import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/';

import { filter, map } from 'rxjs/operators';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

import { users } from '../model/users';
import { UserService } from '../servicios/servicio.index';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {
  hide = true;
  titulo: string;
  public user: users;
  public status: string;
  public token;
  public identity;
  auth2: any; //declarar objeto con info de google
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor( private userService: UserService, private router: Router, private title: Title ) {
    this.user = new users('','','','','');

    this.getDataRoute()
    .subscribe( data => {
      console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle('EventosUBB - ' + this.titulo);
    });

   }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Ingresa un correo' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '964769714688-k37ooin32et4b2a7iokpbtcv2nn5ca41.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email' //información que se necesita de la cuenta de google 
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }

  attachSignin( element ){
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      //Obtener los datos del usuario
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this.userService.signUpGoogle().subscribe( response => {
        console.log(response);
      })

    });
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd ),
      filter( (evento:ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento:ActivationEnd) => evento.snapshot.data )
    )
  }

  onSubmit(form: NgForm){

    this.userService.signUp(this.user).subscribe(

      response => {

        // Recibir el TOKEN 
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;

          // Objeto usuario identificado 
          this.userService.signUp(this.user, true).subscribe(
            response => {
              console.log(response);
              this.identity = response; 

              console.log(this.token);
              console.log(this.identity);

              localStorage.setItem('token',this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              this.router.navigate(['/inicio']);

            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
        } else {
          this.status = 'error';
        }

        // this.router.navigate(['/login']);

      },
      error => {
        console.log(<any>error);
      }

    );

    // this.router.navigate(['/login']);
  }

  // Iniciar sesión con google


}
