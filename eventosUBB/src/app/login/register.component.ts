import { Component, OnInit } from '@angular/core';

import { evento } from '../model/evento';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public evento: evento;

  constructor() { 
    this.evento = new evento('','','','','',null, );
  }

  ngOnInit() {
  }

  onSubmit(form){

  }

}
