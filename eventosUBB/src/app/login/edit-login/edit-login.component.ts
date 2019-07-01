import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UserService } from '../../servicios/servicio.index';
import { users } from '../../model/users';

declare function init_plugins();
@Component({
  selector: 'app-edit-login',
  templateUrl: './edit-login.component.html',
  styleUrls: ['./edit-login.component.css'],
  providers: [ UserService ]

})
export class EditLoginComponent implements OnInit {
  
  titulo: string;

  public user: users;
  public status: string;
  public identity;
  public token;
  constructor( private userService: UserService, private router: Router, private title: Title ) { 
    this.user = new users('','','','',''); 
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    //rellena objeto usuario
    this.user = new users (
      this.identity.nombreUsuario,
      this.identity.apellidoUsuario,
      this.identity.email,
      this.identity.password,
      this.identity.avatar,
      this.identity.sub
    );
    this.getDataRoute()
    .subscribe( data => {
      console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle('EventosUBB - ' + this.titulo);
    });

  }

  ngOnInit() {
    init_plugins();

  }
  getDataRoute(){
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd ),
      filter( (evento:ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento:ActivationEnd) => evento.snapshot.data )
    )
  }
  onSubmit(form){
    this.userService.update(this.token, this.user).subscribe(
      response => {
        console.log(response);
      },
      error =>{
        this.status='error';
          console.log(<any>error);
      }
    );
  }

}
