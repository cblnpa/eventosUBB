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

  constructor( public userService: UserService ) { 
    this.identity = this.userService.getIdentity();
    this.url = global.url;
  }

  ngOnInit() {
  }

  }
