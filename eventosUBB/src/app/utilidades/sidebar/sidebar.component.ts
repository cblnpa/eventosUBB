import { Component, OnInit } from '@angular/core';

import { UserService, SidebarService } from '../../servicios/servicio.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ UserService, SidebarService ]
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
