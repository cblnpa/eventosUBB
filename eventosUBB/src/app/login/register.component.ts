import { Component, OnInit } from '@angular/core';

import { UserService } from '../servicios/servicio.index';
import { users } from '../model/users';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService ]
})
export class RegisterComponent implements OnInit {

  public user: users;
  public status: string;

  constructor( private userService: UserService ) {
    this.user = new users('','','','',''); 
  }

  ngOnInit() {
    init_plugins();
  }

  onSubmit(form){
    this.userService.register(this.user).subscribe(
      response => {
        
        if(response.status == "success"){
          this.status = response.status;
          form.reset();

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
