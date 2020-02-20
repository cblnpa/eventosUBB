import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../servicios/servicio.index';
import { global } from '../../servicios/global'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ UserService ]
})
export class HeaderComponent implements OnInit, DoCheck {

  public identity;
  public url;
  public idUsuario;
  public tipoUsuario; //almacena el perfil del usuario activo

  constructor(public userService: UserService) {
    this.cargarUsuario();
    this.url = global.url;
  }

  ngOnInit() {
    this.getIdUsuario();
    this.getInfoUsuario();
  }

  ngDoCheck(){
    this.cargarUsuario();
  }

  cargarUsuario(){
    this.identity = this.userService.getIdentity();
  }

  getIdUsuario() {
    if (!this.identity.id)
      this.idUsuario = this.identity.sub;
    else
      this.idUsuario = this.identity.id;
  }

  getInfoUsuario() {
    this.userService.getDataUser(this.idUsuario).subscribe(
      response => {
        this.tipoUsuario = response.user[0].perfil.nombrePerfil;
      },
      error => {
        console.log(<any>error);
      })
  }
}
