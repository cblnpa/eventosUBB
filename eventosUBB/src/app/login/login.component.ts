import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/';

import { filter, map } from 'rxjs/operators';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { users } from '../model/users';
import { UserService } from '../servicios/servicio.index';

import Swal from 'sweetalert2';

declare function init_plugins();
declare const gapi: any; //constante para la librería gapi que está en index 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  hide = true;
  titulo: string;
  public user: users;
  public status: string;
  public token;
  public identity;
  auth2: any; //declarar objeto con info de google

  constructor(private userService: UserService, private router: Router, private title: Title) {
    this.user = new users('', '', '', '', '', null, null);

    this.getDataRoute()
      .subscribe(data => {
        this.titulo = data.titulo;
        this.title.setTitle('EventosUBB - ' + this.titulo);
      });

  }

  ngOnInit() {
    init_plugins();
    this.googleInit();

  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({ //el init recibe el client_id, las cookies y scope
        client_id: '964769714688-k37ooin32et4b2a7iokpbtcv2nn5ca41.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email' //información que se necesita de la cuenta de google 
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (Google_Client) => {
      //Obtener los datos del usuario
      let profile = Google_Client.getBasicProfile();

      //let token = Google_Client.getAuthResponse().id_token;
      
      this.userService.loginGoogle(profile).subscribe(response => {
        console.log(response);
        this.identity = response;
        //localStorage.setItem('token', token);
        localStorage.setItem('identity', JSON.stringify(this.identity));
        //window.location.href = '#/inicio';
        //this.router.navigate(['/inicio']);
      });

    });
  }

  onSubmit(form: NgForm) {
    this.userService.signUp(this.user).subscribe(
      response => {
        // Recibir el TOKEN 
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          // Objeto usuario identificado 
          this.userService.signUp(this.user, true).subscribe(
            response => {
              this.identity = response;
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              this.router.navigate(['/inicio']);
              console.log('este es el token');
              console.log(this.token);
              console.log(this.identity);

            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
        } else {
          this.status = 'error';
          Swal.fire({
            type: 'error',
            title: 'Datos incorrectos',
            text: 'ingrese su email y contraseña correctamente',
          })
        }
      }
    );
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    )
  }

}