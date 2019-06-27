import { Component, OnInit } from '@angular/core';

import { users } from '../model/users';
import { UserService } from '../servicios/servicio.index';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  public user: users;
  public status: string;
  public token;
  public identity;

  constructor( private userService: UserService ) {
    this.user = new users('','','','','');
   }

  ngOnInit() {
    init_plugins();
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  onSubmit(form){
    this.userService.signUp(this.user).subscribe(
      response => {
        // Recibir el TOKEN 
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;

          // Objeto usuario identificado 
          this.userService.signUp(this.user, true).subscribe(
            response => {
              this.identity = response; 

              console.log(this.token);
              console.log(this.identity);

              localStorage.setItem('token',this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );

    // this.userService.signUp(this.user).subscribe(
    //   response => {
    //     // Recibe el token 
    //     if(response.status != 'error' ){
    //       this.status = 'success';
    //       this.token = response;

    //       //Objeto usuario identificado
    //       this.userService.signUp(this.user, true).subscribe(
    //         response => {
    //           this.identity = response;

    //           console.log(this.token); //usuario identificado, para enviar en cada petición
    //           console.log(this.identity); //objeto del usuario identificado, para mostrar en el frontend
              
    //           // Persistencia de datos del usuario identificado 
    //           localStorage.setItem('token',this.token);
    //           localStorage.setItem('identity', JSON.stringify(this.identity));

    //           //redireccion al inicio
    //           // this.router.navigate(['inicioEncargado']);

    //         },
    //         error => {
    //           this.status = 'error';
    //           console.log(<any>error);
    //         }
    //       );
    //     } else {
    //       this.status = 'error';
    //     }
    //   },
    //   error => {
    //     this.status = 'error';
    //     console.log(<any>error);
    //   }
    // )
  }

}
