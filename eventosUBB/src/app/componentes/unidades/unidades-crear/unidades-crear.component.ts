import { Component, OnInit } from '@angular/core';
import { UnidadService, UserService } from '../../../servicios/servicio.index';
import { global } from '../../../servicios/global';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { unidad } from '../../../model/model.index';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-unidades-crear',
  templateUrl: './unidades-crear.component.html',
  styleUrls: ['./unidades-crear.component.css'],
  providers: [ UnidadService, UserService ]
})
export class UnidadesCrearComponent implements OnInit {

  titulo: string; 

  public url; //url del backend
  public unidad: unidad; //objeto de tipo unidad 
  public token;

  //Subir imagen
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.jpeg,.png,.gif",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'logo',
      headers: {
        "Authorization" : this.userService.getToken()
         }
    },
     theme: "attachPin",
     hideProgressBar: false,
     hideResetBtn: true,
     hideSelectBtn: false,
     attachPinText: 'Subir logo',
     replaceTexts: {
       attachPinBtn: 'Seleccionar archivo',
       afterUploadMsg_success: 'Archivo seleccionado exitosamente'
     }
};

  constructor( private router: Router, private title: Title, private unidadService: UnidadService, 
    private userService: UserService ) {
    this.unidad = new unidad('','','');
    this.url = global.url;
    this.token = this.userService.getToken();


    //Para mostrar el título de la página actual
    this.getDataRoute()
    .subscribe( data => {
      console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle('EventosUBB - ' + this.titulo);
    });
   }

  ngOnInit() {
  }

  //Función para obtener el nombre de la página actual
  getDataRoute(){
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd ),
      filter( (evento:ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento:ActivationEnd) => evento.snapshot.data )
    )
  }

  //
  guardarUnidad(form){
    this.unidadService.guardarUnidad(this.unidad).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )

  }

  //Función para subir el logo
  logoUpload(logo){
    let data = JSON.parse(logo.response);
    console.log(logo.response);
    this.unidad.logoUnidad = data.image;
    console.log(this.unidad.logoUnidad);
  }

}
