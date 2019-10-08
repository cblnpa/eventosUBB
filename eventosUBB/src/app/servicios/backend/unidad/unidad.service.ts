import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  /* UNIDADES */

  //Agregar unidad
  guardarUnidad(unidad): Observable<any> {
    let json = JSON.stringify(unidad);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + 'userUnidad', params, { headers: headers });
  }

  //Listar todas las unidades
  getUnidades(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'getAllUnidad', { headers: headers });
  }

  //Obtener unidad del usuario
  getUnidad(idUsuario): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'unidad/' + idUsuario, { headers });
  }

  //Obtener datos de la unidad seleccionada
  getUnidadById(idUnidad): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'getUnidadById/' + idUnidad, {headers});
  }

  deleteUnidad(idUnidad): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.delete(this.url + 'subUnidad/' + idUnidad, { headers });
  }

  /* SUB UNIDADES */

  //Agregar sub unidad
  guardarSubUnidad(unidad): Observable<any> {
    let json = JSON.stringify(unidad);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + 'subUnidad', params, { headers: headers });
  }

  //Listar todas las subunidades del usuario
  getSubUnidades(idUser): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'subUnidad/' + idUser, { headers: headers });
  }

  //Obtener logo
  getLogo(archivo): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'logoImage/' + archivo, { headers: headers });
  }


}
