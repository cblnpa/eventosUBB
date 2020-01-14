import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { users } from '../model/model.index';
import { UserService } from '../servicios/servicio.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.css']
})
export class RecuperarPassComponent implements OnInit {

  public user: users;
  public notificacion = 0;

  constructor( private userService: UserService, private router: Router) { 
    this.user = new users('', '', '', '', '', null,null,'', null);
  }

  ngOnInit() {
  }

  onSubmit(form){
    Swal.showLoading();
    setInterval(() => {
      Swal.close();
    },3000)
    this.user.email = form.form.value.email;
    this.userService.cambiarPass(this.user).subscribe(
      response => {
        if(response.code == 200){
          this.notificacion = 1;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
