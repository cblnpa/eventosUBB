import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-eventos-editar',
  templateUrl: './eventos-editar.component.html',
  styleUrls: ['./eventos-editar.component.css']
})
export class EventosEditarComponent implements OnInit {

  firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;
   isLinear: false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
   });
   this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
   });
  }

}
