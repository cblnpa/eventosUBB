import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styles: []
})
export class ComponentesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
