import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class EventoPojoService {

  public url: string;

  constructor( private http: HttpClient ) { 
    this.url = global.url; 
  }

  guardarEventoPojo(evento,material,colaborador,jornada,expositor,actividad): Observable<any>{
    let json = JSON.stringify(evento,material,colaborador); //convierte el evento que se pasa por parámetro a un tipo JSON
    let json2 = JSON.stringify(jornada,expositor,actividad);
    let params = 'json='+json+json2; //se definene los parametros que se mandan al api
    
    //se le pasa tal como se ingresan los datos por postman
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //tipo de peticion
    
    //petición ajax, se manda el post al backend, manda la url + el evento + los parámetros
    //(http://localhost:8000/api/evento) y el params le pasa lo que obtiene el json
    //los headers son las cabeceras que se mandan y así se mandan los métodos
    return this.http.post(this.url+'eventoPojo', params, {headers: headers});
  }

  getEventosPojo():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+'evento', {headers: headers});
  }

}
