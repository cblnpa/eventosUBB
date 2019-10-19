import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { newPass } from '../model/model.index';
import { UserService } from '../servicios/servicio.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./register.component.css']
})
export class CambioPassComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  public newPassModel: newPass;
  public valorUrl;

  constructor( private route: ActivatedRoute, private userService: UserService, private router: Router ) {
    this.newPassModel = new newPass(null, '');
  }

  ngOnInit() {}

  onSubmit() {
    Swal.showLoading();
    this.route.params.subscribe(params => {
      let idUsuario = +params['id'];

      // Verificar la contraseña
      let pass1 = document.getElementsByName('passNueva');
      let pass2 = document.getElementsByName('passNueva2');

      if (pass1["0"].value == pass2["0"].value) {
        this.newPassModel.id = idUsuario;
        this.newPassModel.passNueva = pass1["0"].value;
        console.log(this.newPassModel);

        this.userService.nuevaPass(this.newPassModel).subscribe(
          response => {
            if(response.code == 200) {
              Swal.fire({
                text: 'Contraseña cambiada con éxito',
                type: 'success'
              })
              this.router.navigate(['/login']);
            }
          },
          error => {
            console.log(<any>error);
            Swal.fire({
              text: 'Error interno del servidor',
              type: 'error'
            })
          }
        )
      } else {
        Swal.fire({
          type: 'error',
          title: 'La contraseña debe ser la misma',
        })
      }})}
}
