import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

import { eventoPojo } from '../../../model/eventoPojo';
import { ciudad } from '../../../model/ciudad';
import { EventoPojoService, CiudadService } from '../../../servicios/servicio.index';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-eventos-editar',
  templateUrl: './eventos-editar.component.html',
  styleUrls: ['./eventos-editar.component.css'],
  providers: [ CiudadService, EventoPojoService,{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]

})
export class EventosEditarComponent implements OnInit {

  public eventoPojo: eventoPojo;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  isLinear: false;

  public ciudad: ciudad;
  public ciudades;

  constructor( private _formBuilder: FormBuilder, private eventoPojoService: EventoPojoService, 
    private ciudadService: CiudadService) {

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
    this.eventoPojoService.guardarEventoPojo(this.eventoPojo).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
