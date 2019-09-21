import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  public url: string; //acá se guarda el http://localhost:8000/api/ que esta en global.ts

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  // Guardar material
  guardarMaterial(material): Observable<any> {
    let json = JSON.stringify(material); //convierte el evento que se pasa por parámetro a un tipo JSON
    let params = 'json=' + json; //se definene los parametros que se mandan al api

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //tipo de peticion

    return this.http.post(this.url + 'material', params, { headers: headers });
  }

  //Obtener materiales del evento asociado (show)
  getMateriales(idEvento): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'material/' + idEvento, { headers: headers });
  }

  // Eliminar material 
  deleteMaterial(id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.delete(this.url + 'material/' + id, { headers: headers });
  }

}
