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

  guardarEventoPojo(idUsuario,eventoPojo): Observable<any>{
    let json = JSON.stringify(eventoPojo); //convierte el evento que se pasa por parámetro a un tipo JSON
    let params = 'json='+json; //se definene los parametros que se mandan al api
    
    //se le pasa tal como se ingresan los datos por postman
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    //petición ajax, se manda el post al backend, manda la url + el evento + los parámetros
    //(http://localhost:8000/api/evento) y el params le pasa lo que obtiene el json
    //los headers son las cabeceras que se mandan y así se mandan los métodos
    return this.http.post(this.url+'eventoPojo/' + idUsuario, params, {headers: headers});
  }

  //Obtener el evento del id indicado
  getEventoPojoById(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+'eventoPojo/' + id, {headers: headers});
  }

  updateEventoPojo(eventoPojo, id, idUsuario): Observable<any>{
    let json = JSON.stringify(eventoPojo);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.put(this.url+'eventoPojo/' + id + '/' + idUsuario, params, {headers: headers});
  }

}
