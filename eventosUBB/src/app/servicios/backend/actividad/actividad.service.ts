import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  public url: string; //acá se guarda el http://localhost:8000/api/ que esta en global.ts

  constructor( private http: HttpClient ) { 
    this.url = global.url; 
  }

  // Guardar una actividad
  guardarActividad(actividad): Observable<any>{
    let json = JSON.stringify(actividad); //convierte el evento que se pasa por parámetro a un tipo JSON
    let params = 'json='+json; //se definene los parametros que se mandan al api
    
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //tipo de peticion
    
    return this.http.post(this.url+'actividad', params, {headers: headers});
  }

  //Obtener las actividades del evento asociado (show)
  getActividades(idEvento):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+'actividad/' + idEvento, {headers: headers});
  }

}
