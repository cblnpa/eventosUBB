import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicios/servicio.index';
import {global} from '../../servicios/global'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ UserService ]
})
export class SidebarComponent implements OnInit {

  public identity;
  public url;
  public idPerfil;

  constructor(  public userService: UserService ) { 
    this.identity = this.userService.getIdentity();
    this.url = global.url;
  }

  ngOnInit() {
    this.idPerfil = this.identity.perfil_idPerfil;
  }

}
