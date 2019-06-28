import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/';

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

  }

}
