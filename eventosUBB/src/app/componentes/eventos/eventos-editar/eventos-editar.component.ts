import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../../../servicios/servicio.index';
import { eventoPojo } from '../../../model/eventoPojo';
import { ciudad } from '../../../model/ciudad';
import { EventoPojoService, CiudadService } from '../../../servicios/servicio.index';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {global} from '../../../servicios/global'
import { evento } from '../../../model/evento';


@Component({
  selector: 'app-eventos-editar',
  templateUrl: './eventos-editar.component.html',
  styleUrls: ['./eventos-editar.component.css'],
  providers: [ CiudadService, EventoPojoService,UserService ,{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]

})
export class EventosEditarComponent implements OnInit {
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

  constructor( private _formBuilder: FormBuilder, private userService: UserService,private eventoPojoService: EventoPojoService, 
    private ciudadService: CiudadService) {
      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();
      this.url = global.url;
    this.eventoPojo = new eventoPojo('','','','','',null,'',null,'','','','',null,'','','','',null,null,null,'','','','','','','','','',null,null,'','');
  }

  ngOnInit() {
    this.getCiudades();

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
          console.log(this.ciudades);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  guardarEvento(form){
    this.eventoPojoService.guardarEventoPojo(this.token,this.eventoPojo).subscribe(
      response => {
        console.log(response);
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
}
