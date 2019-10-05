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

  //Obtener material por id
  getMaterialById(idMaterial): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'getMaterial/' + idMaterial, { headers: headers });
  }

  //Actualizar un material
  editMaterial(material, idMaterial) {
    let json = JSON.stringify(material);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.put(this.url + 'material/' + idMaterial, params, { headers: headers });

  }

  // Eliminar material 
  deleteMaterial(id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.delete(this.url + 'material/' + id, { headers: headers });
  }

}
