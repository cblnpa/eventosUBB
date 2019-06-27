import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public token;
  public identity;

  constructor(private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    init_plugins();
    //se ejecuta siempre que se cargue el componente y cierra sesión cuando le llega el parámetro sure por url
    this.logout();
  }

  logout(){

    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    // this.identity = null;
    // this.token = null;

  }

}
