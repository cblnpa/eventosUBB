import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicios/servicio.index';
import {global} from '../../servicios/global'
import { users } from 'src/app/model/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public identity;
  public url;

  public idUsuario; 
  public tipoUsuario; //almacena el perfil del usuario activo

  public usuario: users;

  constructor( public userService: UserService ) { 
    this.identity = this.userService.getIdentity();
    this.url = global.url;
  }

  ngOnInit() {
    this.usuario = this.userService.getIdentity();
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
