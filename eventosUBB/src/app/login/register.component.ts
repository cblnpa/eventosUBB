import { Component, OnInit } from '@angular/core';

import { filter, map } from 'rxjs/operators';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UserService } from '../servicios/servicio.index';
import { users } from '../model/users';

import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService ]
})
export class RegisterComponent implements OnInit {

  titulo: string;

  public user: users;
  public status: string;

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
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd ),
      filter( (evento:ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento:ActivationEnd) => evento.snapshot.data )
    )
  }

  onSubmit(form){
    this.userService.register(this.user).subscribe(
      response => {
        
        if(response.status == "success"){
          this.status = response.status;
          form.reset();
          console.log(response);
          console.log('Registrado exitosamente');

        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    ); 

    Swal.fire({
      type: 'success',
      title: '¡Registro exitoso!',
      text: 'Te has registrado exitosamente, inicia sesión con tus datos para ingresar a la página',
    })

    this.router.navigate(['/login']);

  }

}
