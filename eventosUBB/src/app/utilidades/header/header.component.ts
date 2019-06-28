import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicios/servicio.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ UserService ]
})
export class HeaderComponent implements OnInit {

  public identity;
  public token;

  constructor( public userService: UserService ) { 
    this.identity = this.userService.getIdentity();
  }

  ngOnInit() {
  }

  }
