import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { evento } from '../../../model/evento';
import { EventoService } from '../../../servicios/servicio.index';

@Component({
  selector: 'app-eventos-editar',
  templateUrl: './eventos-editar.component.html',
  styleUrls: ['./eventos-editar.component.css']
})
export class EventosEditarComponent implements OnInit {

  public evento: evento; 

  firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;
   isLinear: false;

  constructor(private _formBuilder: FormBuilder, private eventoService: EventoService) {
    this.evento = new evento('','','','','',null);
   }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
   });
   this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
   });
  }

  guardarEvento(form){
    this.eventoService.guardarEvento(this.evento).subscribe(
      response => {
        console.log(response);
        form.reset();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
