import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { UnidadService, UserService, CiudadService } from '../../../servicios/servicio.index';
import { global } from '../../../servicios/global';
import { Title } from '@angular/platform-browser';
import { unidad, users, ciudad } from '../../../model/model.index';
import { filter, map } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidades-crear',
  templateUrl: './unidades-crear.component.html',
  styleUrls: ['./unidades-crear.component.css'],
  providers: [UnidadService, UserService]
})
export class UnidadesCrearComponent implements OnInit {

  public titulo: string;
  public url; //url del backend
  public unidad: unidad; //objeto de tipo unidad 
  public token;
  public identity;
  public idPerfil; //almacenar perfil del usuario loggeado, util para los ngIf del HTML

  //variables para el select
  public usuario: users;
  public usuarios: any = []; //almacenar los usuarios
  public optionsUsuario;

  public ciudad: ciudad;
  public ciudades: any = []; //almacena las ciudades (o sedes)
  public optionsCiudad;

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

  configCiudad = {
    displayKey: 'nombreCiudad', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '150px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Seleccionar sede', // text to be displayed when no item is selected defaults to Select,
    noResultsFound: '¡No se encuentra la sede!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Buscar sede', // label thats displayed in search input,
    searchOnKey: 'nombreCiudad' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  //Subir imagen
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.jpeg,.png,.gif",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'logo',
      headers: {
        "Authorization": this.userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    attachPinText: 'Subir logo',
    replaceTexts: {
      attachPinBtn: 'Seleccionar archivo',
      afterUploadMsg_success: 'Archivo seleccionado exitosamente'
    }
  };

  constructor(private router: Router, private title: Title, private unidadService: UnidadService,
    private userService: UserService, private ciudadService: CiudadService) {
    this.unidad = new unidad('','','','',null);
    this.usuario = new users('', '', '', '', '', null, null, null);
    this.ciudad = new ciudad(null, '');
    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();

    //Para mostrar el título de la página actual
    this.getDataRoute()
      .subscribe(data => {
        this.titulo = data.titulo;
        this.title.setTitle('EventosUBB - ' + this.titulo);
      });
  }

  ngOnInit() {
    this.getUsuarios();
    this.getCiudades();
    this.getPerfil();
  }

  //Función para obtener el nombre de la página actual
  getDataRoute() {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    )
  }

  getUsuarios() {
    this.userService.getAll().subscribe(
      response => {
        this.optionsUsuario = response.users;
      },
      error => {
        console.log(<any>error);
      })
  }

  getCiudades() {
    this.ciudadService.getCiudades().subscribe(
      response => {
        this.optionsCiudad = response.ciudad;
      },
      error => {
        console.log(<any>error);
      })
  }

  // Asignar a la variable idPerfil el perfil del usuario activo
  getPerfil(){
    this.idPerfil = this.identity.perfil_idPerfil;
  }

  // Función para guardar la unidad 
  guardarUnidad(form) {
    this.unidad.email = this.usuarios.email;
    this.unidad.sede = this.ciudades.nombreCiudad;
    this.unidadService.guardarUnidad(this.unidad).subscribe(
      response => {
        if(response.status == 'success'){
          Swal.fire({
            type: 'success',
            title: '¡Se ha creado con éxito la unidad!'
          });
        }
        this.router.navigate(['/verUnidades']);
      },
      error => {
        console.log(<any>error);
      })
  }

  // Función para guardar la Sub Unidad
  guardarSubUnidad(form){
    this.unidad.email = this.usuarios.email;
    this.unidad.idAdminUnidad = this.idPerfil;
    console.log('Guardar sub unidad');
    console.log(this.unidad);
    this.unidadService.guardarSubUnidad(this.unidad).subscribe(
      response => {
        if(response.code == 200){
          Swal.fire({
            type: 'success',
            title: '¡Se ha creado con éxito la sub unidad!'
          });
        }
        this.router.navigate(['/verUnidades']);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Función para subir el logo
  logoUpload(logo) {
    let data = JSON.parse(logo.response);
    console.log(logo.response);
    this.unidad.logoUnidad = data.image;
    console.log(this.unidad.logoUnidad);
  }

}
