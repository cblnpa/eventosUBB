import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
   }

  guardarAjustes() {
    //convierte ajustes en un String para guardarlo en el localStorage
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      //convierte el string del json a un objeto ajustes
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);    }
  }

  aplicarTema(tema: string){
    let urlIndex = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', urlIndex );
    
    //utilizar el servicio para la persistencia
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = urlIndex;

    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
