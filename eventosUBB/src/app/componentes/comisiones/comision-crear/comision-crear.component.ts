import { Component, OnInit } from '@angular/core';
import { evento, comision, users } from 'src/app/model/model.index';
import { EventoUsersService, UserService } from '../../../servicios/servicio.index';


@Component({
  selector: 'app-comision-crear',
  templateUrl: './comision-crear.component.html',
  styleUrls: ['./comision-crear.component.css'],
  providers: [ EventoUsersService, UserService ]
})
export class ComisionCrearComponent implements OnInit {

  public eventos: evento;
  public identity;
  public idUsuario;
  
  public comision: comision;
  public idEvento;

  public usuario: users;
  public usuarios: any = []; //almacenar los usuarios
  public options; //usuarios 

  config = {
    displayKey:"nombreUsuario", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Seleccionar usuarios', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    //limitTo: options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: '¡No se encuentra el usuario!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Buscar usuarios', // label thats displayed in search input,
    searchOnKey: 'nombreUsuario' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

  constructor( private eventoUsersService: EventoUsersService, private userService: UserService ) { 
    this.identity = this.userService.getIdentity();
    this.comision = new comision(null,'');
    this.usuario = new users('','','','','',null,null,null);
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
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  listarEventos(){
    this.eventoUsersService.getMisEventosAdmin(this.idUsuario).subscribe(
      response => {
        this.eventos = response.eventos;
      },
      error => {
        console.log(<any>error);
      }
    )

  }

  crearComision(form){

    this.idEvento = this.comision.evento_idEvento;
    console.log(this.idEvento);

    console.log('usuariossss');
    console.log(this.usuarios);

    this.eventoUsersService.crearComision(this.usuarios, this.idEvento).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )

  }

}
