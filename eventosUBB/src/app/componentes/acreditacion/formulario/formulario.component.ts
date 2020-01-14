import { Component, OnInit } from '@angular/core';
import { EventoUsersService, UserService } from '../../../servicios/servicio.index';
import { evento } from '../../../model/model.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public identity; //para obtener el id
  public idUsuario;
  public idEvento;

  //variables para el select
  public evento: evento;
  public eventos: any = []; //almacena los eventos
  public optionEvento;

  configEvento = {
    displayKey: 'nombreEvento', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '150px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Seleccionar evento', // text to be displayed when no item is selected defaults to Select,
    noResultsFound: '¡No se encuentra el evento!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Buscar evento', // label thats displayed in search input,
    searchOnKey: 'evento_idEvento' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  constructor(private userService: UserService, private eventoUsersService: EventoUsersService,
    private router: Router) {
    this.identity = this.userService.getIdentity();
  }

  ngOnInit() {
    this.getIdUsuario();
    this.listarEventos();
  }

  getIdUsuario() {
    if (!this.identity.id)
      this.idUsuario = this.identity.sub;
    else
      this.idUsuario = this.identity.id;
  }

  listarEventos() {
    console.log(this.idUsuario);
    this.eventoUsersService.getMisEventosAdmin(this.idUsuario).subscribe(
      response => {
        this.optionEvento = response.eventos;
      },
      error => {
        console.log(<any>error);
      })
  }

  acreditarEvento(form) {
    this.idEvento = form.value.evento_idEvento.idEvento;
    this.router.navigate(['/acreditar/' + this.idEvento]);
  }

}
