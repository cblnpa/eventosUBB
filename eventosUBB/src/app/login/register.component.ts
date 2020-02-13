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
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  titulo: string;
  public user: users;
  public loading = false; //para el spinner

  constructor(private userService: UserService, private router: Router, private title: Title) {
    this.user = new users('', '', '', '', '', 2, null, null);
    this.getDataRoute()
      .subscribe(data => {
        this.titulo = data.titulo;
        this.title.setTitle('EventosUBB - ' + this.titulo);
      });
  }

  ngOnInit() {
    init_plugins();
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    )
  }

  onSubmit(registerForm) {
    let aux = document.getElementsByName('nombreUsuario');
    let nombre = aux["0"].value;
    nombre.replace(/\s/g, "");
    console.log(nombre);
    Swal.fire({
      title: 'Espere un momento'
    })
    Swal.showLoading();
    // Verificar la contraseña
    let pass1 = document.getElementsByName('password');
    let pass2 = document.getElementsByName('password2');

    if (pass1["0"].value == pass2["0"].value) {
      //Si las contraseñas son iguales, se crea el usuario
      this.userService.register(this.user).subscribe(
        response => {
          console.log(response);
          if (response.code == 200) {
            registerForm.reset();
            Swal.fire({
              type: 'success',
              title: '¡Registro exitoso!',
              text: 'Antes de iniciar sesión verifica tu cuenta mediante el correo que te hemos enviado',
            })

            this.router.navigate(['/login']);
          }
          if( response.code == 404){
            Swal.fire({
              type: 'warning',
              title: 'Ya existe una cuenta asociada al correo'
            })
            registerForm.reset();
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    } else {
      Swal.fire({
        type: 'error',
        title: 'La contraseña debe ser la misma',
      })
    }
  }

}