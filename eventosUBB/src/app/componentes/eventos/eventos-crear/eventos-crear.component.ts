import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import { eventoPojo } from '../../../model/eventoPojo';
import { ciudad, evento } from '../../../model/model.index';
import { EventoPojoService, CiudadService, UserService } from '../../../servicios/servicio.index';
import {global} from '../../../servicios/global'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-crear',
  templateUrl: './eventos-crear.component.html',
  styleUrls: ['./eventos-crear.component.css'],
  providers: [ EventoPojoService, CiudadService, UserService, 
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false} } ]
})
export class EventosCrearComponent implements OnInit {

  public eventos: evento;
  public eventoPojo: eventoPojo;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  isLinear: false;
  public identity;
  public url;
  public token;
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.jpeg,.png,.gif",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'upload',
      headers: {
     "Authorization" : this.userService.getToken()
      }
    },
     theme: "attachPin",
     hideProgressBar: false,
     hideResetBtn: true,
     hideSelectBtn: false,
     attachPinText: 'sube avatar'
  };

  public ciudad: ciudad;
  public ciudades;

  public sub; //id del usuario que inicia sesión

  constructor( private _formBuilder: FormBuilder, private userService: UserService,
    private eventoPojoService: EventoPojoService, private router: Router, 
    private ciudadService: CiudadService ) {

      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();
      this.url = global.url;
      this.eventoPojo = new eventoPojo('','','','','',null,'',null,'','','','',null,'','','','',null,null,null,'','','','','','','','','',null,null,'','');
      
     }

  ngOnInit() {

    this.getCiudades();
    this.sub = this.identity.sub; // Obtener el id del usuario que inició sesión

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });

    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });

    this.sixthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });

  }

  getCiudades(){
    this.ciudadService.getCiudades().subscribe(
      response => {
        if( response.status == 'success' ){
          this.ciudades = response.ciudad;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  guardarEvento(form){
    this.eventoPojoService.guardarEventoPojo(this.sub,this.eventoPojo).subscribe(
      response => {
        console.log(response);

        Swal.fire({
          type: 'success',
          title: '¡Registro exitoso!'
        });

        this.router.navigate(['/inicio']);

      },
      error => {
        console.log(<any>error);
      }
    )
  }

  imagenUpload(datos){
    let data =JSON.parse(datos.response);
    console.log(datos.response);
    this.eventoPojo.imagen = data.image;
    console.log(this.eventoPojo.imagen);
  }

  logoUpload(datos){
    let data =JSON.parse(datos.response);
    console.log(datos.response);
    this.eventoPojo.logo = data.image;
    console.log(this.eventoPojo.logo);
  }

  fotoUpload(datos){
    let data =JSON.parse(datos.response);
    console.log(datos.response);
    this.eventoPojo.foto = data.image;
    console.log(this.eventoPojo.foto);
  }

}
