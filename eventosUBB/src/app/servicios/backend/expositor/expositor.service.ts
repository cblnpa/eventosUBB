import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ExpositorService {

  public url: string; //acá se guarda el http://localhost:8000/api/ que esta en global.ts

  constructor( private http: HttpClient ) { 
    this.url = global.url; 
  }

  // Guardar un expositor
  guardarExpositor(expositor): Observable<any>{
    let json = JSON.stringify(expositor); //convierte el evento que se pasa por parámetro a un tipo JSON
    let params = 'json='+json; //se definene los parametros que se mandan al api
    
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //tipo de peticion
    
    return this.http.post(this.url+'expositor', params, {headers: headers});
  }

  //Obtener jornadas 
  getExpositoresActividad(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+'mostrarExpositor/' +id, {headers: headers});
  }

  // Eliminar expositor 
  deleteExpositor(id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.delete(this.url + 'expositor/' + id, { headers: headers });
  }
}
