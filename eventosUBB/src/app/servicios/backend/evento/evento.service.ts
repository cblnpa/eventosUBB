import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { global } from '../../global';

import { evento } from '../../../model/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  public url: string; //acá se guarda el http://localhost:8000/api/ que esta en global.ts

  constructor( private http: HttpClient ) {
    this.url = global.url; 
  }

  guardarEvento(evento): Observable<any>{
    let json = JSON.stringify(evento); //convierte el evento que se pasa por parámetro a un tipo JSON
    let params = 'json='+json; //se definene los parametros que se mandan al api
    
    //se le pasa tal como se ingresan los datos por postman
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //tipo de peticion
    
    //petición ajax, se manda el post al backend, manda la url + el evento + los parámetros
    //(http://localhost:8000/api/evento) y el params le pasa lo que obtiene el json
    //los headers son las cabeceras que se mandan y así se mandan los métodos
    return this.http.post(this.url+'evento', params, {headers: headers});
  }

}
