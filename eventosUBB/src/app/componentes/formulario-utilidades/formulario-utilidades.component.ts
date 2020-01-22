import { Component, OnInit, Output } from '@angular/core';
import { UserService, EventoUsersService } from '../../servicios/servicio.index';
import { evento } from '../../model/model.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-utilidades',
  templateUrl: './formulario-utilidades.component.html',
  styleUrls: ['./formulario-utilidades.component.css']
})
export class FormularioUtilidadesComponent implements OnInit {

  public selectUtilidad; //almacena el tipo de utilidad a generar
  public identity; //para obtener el id
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
    this.listarEventos();
  }

  listarEventos() {
    this.eventoUsersService.getMisEventosAdmin(this.identity.sub).subscribe(
      response => {
        this.optionEvento = response.eventos;
      },
      error => {
        console.log(<any>error);
      })
  }

  //Cargar parámetros de lo seleccionado
  cargarContenido(form) {
    this.idEvento = this.eventos.idEvento;
    if (this.selectUtilidad == 'programa')
      this.router.navigate(['/programa/' + this.idEvento]);
    if (this.selectUtilidad == 'diploma')
      this.router.navigate(['/generarUtilidades2/' + this.idEvento + '/' + this.selectUtilidad]);
    if (this.selectUtilidad == 'certificado')
      this.router.navigate(['/generarUtilidades/' + this.idEvento + '/' + this.selectUtilidad]);
    if (this.selectUtilidad == 'credencial')
      this.router.navigate(['/generarUtilidades/' + this.idEvento + '/' + this.selectUtilidad]);
  }
}
