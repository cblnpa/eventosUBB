import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../servicios/servicio.index';
import { global } from '../../servicios/global'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService]
})
export class SidebarComponent implements OnInit, DoCheck {

  public identity;
  public url;
  public idPerfil;

  constructor(public userService: UserService) {
    this.cargarUsuario();
    this.url = global.url;
  }

  ngOnInit() {
    this.idPerfil = this.identity.perfil_idPerfil;
  }

  ngDoCheck() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.identity = this.userService.getIdentity();
  }

}
