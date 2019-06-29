import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { eventoPojo } from '../../../model/eventoPojo';
import { EventoPojoService } from '../../../servicios/servicio.index';



@Component({
  selector: 'app-eventos-editar',
  templateUrl: './eventos-editar.component.html',
  styleUrls: ['./eventos-editar.component.css'],
  providers: [ EventoPojoService ]

})
export class EventosEditarComponent implements OnInit {

  public eventoPojo: eventoPojo;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear: false;

  constructor( private _formBuilder: FormBuilder, private eventoPojoService: EventoPojoService ) {
    this.eventoPojo = new eventoPojo('','','','','',null,'',null,'','','','',null,'','','','',null,null,null,'','','','','','','','','',null,null,'','');
   }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
   });
   this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
   });
  }

  /*
    this.eventoPojoService.guardarEventoPojo(this.eventoPojo).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  */

  guardarEvento(form){
    // this.eventoService.guardarEvento(this.evento).subscribe(
    //   response => {
    //     console.log(response);
    //     form.reset();
    //   },
    //   error => {
    //     console.log(<any>error);
    //   }
    // );
  }

}
