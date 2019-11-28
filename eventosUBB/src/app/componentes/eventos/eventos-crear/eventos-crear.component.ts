import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoPojoService, UserService } from '../../../servicios/servicio.index';
import { eventoPojo, users } from '../../../model/model.index';
import {global} from '../../../servicios/global'


import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-crear',
  templateUrl: './eventos-crear.component.html',
  styleUrls: ['./eventos-crear.component.css'],
  providers: [ EventoPojoService, UserService ]
})
export class EventosCrearComponent implements OnInit {

  public url;

  public idUsuario; 
  public identity;

  public evento: eventoPojo;

  //variables para el select
  public usuario: users;
  public usuarios: any = []; //almacenar los usuarios
  public optionsUsuario;

    //Configuraciones del ngx-select-dropdown
    configUsuario = {
      displayKey: 'email', //if objects array passed which key to be displayed defaults to description
      search: true, //true/false for the search functionlity defaults to false,
      height: '150px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Seleccionar usuario', // text to be displayed when no item is selected defaults to Select,
      noResultsFound: '¡No se encuentra el usuario!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'Buscar usuario', // label thats displayed in search input,
      searchOnKey: 'email' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

  constructor( private userService: UserService, private eventoPojoService: EventoPojoService, 
    private router: Router ) {
      this.url = global.url;
      this.identity = this.userService.getIdentity();
      this.idUsuario = this.identity.sub;
      this.evento = new eventoPojo('','','','','',null,'',null,'','','','',null,'','','','',null,null,null,'','','','','','','','','',null,null,'','','','',null,null);
     }

  ngOnInit() {
    this.getIdUsuario();
    this.getUsuarios();
  }

  getIdUsuario() {
    if (!this.identity.id)
      this.idUsuario = this.identity.sub;
    else
      this.idUsuario = this.identity.id;
  }

  getUsuarios() {
    this.userService.getAll(this.idUsuario).subscribe(
      response => {
        console.log(response);
        this.optionsUsuario = response.users;
      },
      error => {
        console.log(<any>error);
      })
  }

  guardarEvento(form){
    //pasar el id del usuario activo
    this.evento.id = this.idUsuario;
    this.evento.email = this.usuarios.email;
    Swal.showLoading(); 
    this.eventoPojoService.guardarEventoPojo(this.evento).subscribe(
      response => {
        if(response.code == 200){
          Swal.fire({
            type: 'success',
            title: '¡Registro exitoso!'
          });
          this.router.navigate(['/inicio']);
        }
      },
      error => {
        console.log(<any>error);
      })
  }

  salirCrearEvento(){
    Swal.fire({
      title: '¿Está seguro que desea salir?',
      text: "Al salir, el evento no se creará",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03C303',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero salir',
      cancelButtonText: 'No, no quiero salir'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/misEventos']);
      }
    })
  }

}
