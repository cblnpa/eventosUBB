import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { UnidadService, UserService, CiudadService } from '../../../servicios/servicio.index';
import { global } from '../../../servicios/global';
import { Title } from '@angular/platform-browser';
import { unidad, users, ciudad, unidadEdit } from '../../../model/model.index';
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
  public miUnidad: unidad; //almacena los datos de la unidad a la que pertenece el usuario activo
  public token;
  public identity;
  public idUsuario;
  public idPerfil; //almacenar perfil del usuario loggeado, util para los ngIf del HTML
  public tipoVista; //si es 1 muestra crear si es 2 editar
  public idUnidad;
  public unidadEdit;

  //variables para el select
  public usuario: users;
  public usuarios: any = []; //almacenar los usuarios
  public optionsUsuario;

  public ciudad: ciudad;
  public ciudades: any = []; //almacena las ciudades (o sedes)
  public optionsCiudad;

  //Configuraciones del ngx-select-dropdown para crear unidad
  configUsuario = {
    displayKey: 'email', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '100px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
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

  constructor(private router: Router, private route: ActivatedRoute, private title: Title,
    private unidadService: UnidadService, private userService: UserService,
    private ciudadService: CiudadService) {
    this.unidad = new unidad('', '', '', '', null);
    this.miUnidad = new unidad('', '', '', '', null);
    this.unidadEdit = new unidadEdit('', '', '');
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
    this.getUrl();
    this.getUsuarios();
    this.getCiudades();
    this.getPerfil();
    this.getIdUsuario();
    this.getDatosUnidad();
    this.getDataUnidad();
  }

  //Función para obtener el nombre de la página actual
  getDataRoute() {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    )
  }

  //Almacena el id del usuario verificando si el identity está con sub o id
  getIdUsuario() {
    if (!this.identity.id) {
      this.idUsuario = this.identity.sub;
    } else {
      this.idUsuario = this.identity.id;
    }
  }

  //Verifica si la url es para editar o agregar
  getUrl() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.idUnidad = id;
      if (this.idUnidad == undefined) {
        this.tipoVista = 1;
      } else {
        this.tipoVista = 2;
      }
    })
  }

  //Obtener datos de la unidad y mostrar el nombre de la unidad en el input
  getDatosUnidad() {
    if (this.idUnidad != undefined) {
      this.unidadService.getUnidadById(this.idUnidad).subscribe(
        response => {
          console.log(response);
          this.unidadEdit.nombreUnidad = response.unidad.nombreUnidad;
          this.unidadEdit.sede = response.unidad.sede;
        }, error => {
          console.log(<any>error);
        })
    }
  }

  //Obtiene los usuarios para el select-dropdown
  getUsuarios() {
    this.userService.getAll(this.idUsuario).subscribe(
      response => {
        console.log(response);
        console.log(this.idUsuario);
        this.optionsUsuario = response.users;
      },
      error => {
        console.log(<any>error);
      })
  }

  //Obtiene las ciudades para el select-dropdown
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
  getPerfil() {
    this.idPerfil = this.identity.perfil_idPerfil;
  }

  // Función para guardar la unidad 
  guardarUnidad(form) {
    this.unidad.email = this.usuarios.email;
    this.unidad.sede = this.ciudades.nombreCiudad;
    Swal.showLoading();
    this.unidadService.guardarUnidad(this.unidad).subscribe(
      response => {
        console.log(response);
        if (response) {
          Swal.fire({
            type: 'success',
            title: '¡Se ha creado con éxito la unidad!'
          });
          this.router.navigate(['/verUnidades']);
        }
      },
      error => {
        console.log(<any>error);
        Swal.close();
      })
  }

  salirCrearUnidad() {
    Swal.fire({
      title: '¿Está seguro que desea salir?',
      text: "Al salir, la unidad no se creará",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03C303',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero salir',
      cancelButtonText: 'No, no quiero salir'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/verUnidades']);
      }
    })
  }

  //Editar unidad
  editarUnidad(form) {
    this.unidadEdit.sede = this.ciudades.nombreCiudad;
    this.unidadService.editarUnidad(this.unidadEdit, this.idUnidad).subscribe(
      response => {
        if (response) {
          Swal.fire({
            type: 'success',
            title: 'Se han modificado con éxito los datos de la unidad'
          });
          this.router.navigate(['/verUnidades']);
        }
      }, error => {
        console.log(<any>error);
      }
    )
  }

  //Salir de editar unidad
  salirEditarUnidad(){
    Swal.fire({
      title: '¿Está seguro que desea salir?',
      text: "Al salir, la unidad no se editará",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03C303',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero salir',
      cancelButtonText: 'No, no quiero salir'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/verUnidades']);
      }
    })
  }

  //Obtener los datos de la unidad del usuario para crear su subunidad
  getDataUnidad() {
    this.unidadService.getUnidad(this.idUsuario).subscribe(
      response => {
        if (response.code == 200) {
          if (response.unidad.length > 0) {
            this.miUnidad = response.unidad[0].unidad;
          }
        }
      }, error => {
        console.log(<any>error);
      })
  }

  // Función para guardar la Sub Unidad
  guardarSubUnidad(form) {
    this.miUnidad.email = this.usuarios.email;
    this.miUnidad.idAdminUnidad = this.idUsuario;
    Swal.showLoading();
    this.unidadService.guardarSubUnidad(this.miUnidad).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          Swal.fire({
            type: 'success',
            title: 'Ayudante asignado a su unidad exitosamente'
          });
          this.router.navigate(['/verUnidades']);
        }
        if (response.code == 400) {
          Swal.fire({
            type: 'error',
            title: 'Verifica el ayudante que has seleccionado'
          });
        }
      },
      error => {
        console.log(<any>error);
        Swal.close();
      })
  }

  salirCrearSubUnidad() {
    Swal.fire({
      title: '¿Está seguro que desea salir?',
      text: "Al salir, no aasignará ningún ayudante a su unidad",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03C303',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero salir',
      cancelButtonText: 'No, no quiero salir'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/verUnidades']);
      }
    })
  }

  //Función para subir el logo
  logoUpload(logo) {
    let data = JSON.parse(logo.response);
    this.unidad.logoUnidad = data.image;
    this.unidadEdit.logoUnidad = data.image;
  }

}
