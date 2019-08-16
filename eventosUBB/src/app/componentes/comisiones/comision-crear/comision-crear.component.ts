import { Component, OnInit } from '@angular/core';
import { evento, users } from 'src/app/model/model.index';
import { EventoUsersService, UserService } from '../../../servicios/servicio.index';


@Component({
  selector: 'app-comision-crear',
  templateUrl: './comision-crear.component.html',
  styleUrls: ['./comision-crear.component.css'],
  providers: [ EventoUsersService, UserService ]
})
export class ComisionCrearComponent implements OnInit {

  public identity; //obtiene los datos del usuario
  public idUsuario; //almacena id del usuario identificado
  public idEvento; //almacena el id del evento para enviar al servicio

  public comision;

  //variables para el select
  public evento: evento;
  public eventos: any = []; //almacena los eventos
  public optionEvento;

  public usuario: users;
  public usuarios: any = []; //almacenar los usuarios
  public options; 

  configUsuario = {
    displayKey:'nombreUsuario', //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Seleccionar usuarios', // text to be displayed when no item is selected defaults to Select,
    moreText: 'más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: '¡No se encuentra el usuario!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Buscar usuarios', // label thats displayed in search input,
    searchOnKey: 'nombreUsuario' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  configEvento = {
    displayKey: 'evento_idEvento', //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Seleccionar evento', // text to be displayed when no item is selected defaults to Select,
    noResultsFound: '¡No se encuentra el evento!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Buscar evento', // label thats displayed in search input,
    searchOnKey: 'evento_idEvento' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  constructor( private eventoUsersService: EventoUsersService, private userService: UserService ) { 
    this.identity = this.userService.getIdentity();
    this.usuario = new users('','','','','',null,null,null);
    this.evento = new evento('','','','','',null,'',null,null,null);
  }

  ngOnInit() {
    this.idUsuario = this.identity.sub;
    this.listarEventos();
    this.getUsuarios();
  }

  getUsuarios(){
    this.userService.getAll().subscribe(
      response => {
        this.options = response.users;
        console.log('op user');
        console.log(this.options);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  listarEventos(){
    this.eventoUsersService.getMisEventosAdmin(this.idUsuario).subscribe(
      response => {
        this.optionEvento = response.eventos;
        console.log('op evento');
        console.log(this.optionEvento);
      },
      error => {
        console.log(<any>error);
      }
    )

  }

  crearComision(form){

    this.idEvento = this.eventos.evento_idEvento;
    
    // this.eventoUsersService.crearComision(this.usuarios, this.idEvento).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.log(<any>error);
    //   }
    // )

  }

}
