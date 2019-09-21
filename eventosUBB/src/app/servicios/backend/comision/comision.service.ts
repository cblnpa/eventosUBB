import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ComisionService {

  public url: string;

  constructor( private http: HttpClient ) { 
    this.url = global.url;
  }

  //Listar todas las comisiones
  getComisiones(idEvento):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+'getAllComision/' + idEvento, {headers: headers});
  }

  //Eliminar integrante de la comisión
  deleteComision(datos):Observable<any>{
    let json = JSON.stringify(datos); 
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+'evento_users/delete/comision', params, {headers: headers});
  }

}
