import { Component, OnInit } from '@angular/core';

import { UserService } from '../../servicios/servicio.index';
import { SidebarService } from 'src/app/servicios/servicio.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ UserService ]
})
export class SidebarComponent implements OnInit {

  public identity;
  public token;

  constructor( public _sidebar: SidebarService, private userService: UserService ) { 
    this.identity = this.userService.getIdentity();
  }

  ngOnInit() {
  }

}
