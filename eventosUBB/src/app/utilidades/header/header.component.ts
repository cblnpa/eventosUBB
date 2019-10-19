import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicios/servicio.index';
import {global} from '../../servicios/global'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ UserService ]
})
export class HeaderComponent implements OnInit {

  public identity;
  public token;
  public url;

  public idUsuario; 
  public tipoUsuario; //almacena el perfil del usuario activo

  constructor( public userService: UserService ) { 
    this.identity = this.userService.getIdentity();
    this.url = global.url;
  }

  ngOnInit() {
    this.getIdUsuario();
    this.getInfoUsuario();
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
      })}
  }
