import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  public url: string;

  constructor( private http: HttpClient ) { 
    this.url = global.url;
  }

  //Agregar una unidad a la base de datos
  guardarUnidad(unidad): Observable<any> {
    let json = JSON.stringify(unidad);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url+'userUnidad',params, {headers: headers});
  }

  //Listar todas las unidades
  getUnidades():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+'userUnidad', {headers: headers});
  }
}
