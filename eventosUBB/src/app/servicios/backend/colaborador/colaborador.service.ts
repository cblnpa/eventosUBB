import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  public url: string; //acá se guarda el http://localhost:8000/api/ que esta en global.ts

  public general = new EventEmitter();

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  // Guardar un colaborador
  guardarColaborador(colaborador): Observable<any> {
    let json = JSON.stringify(colaborador); //convierte el evento que se pasa por parámetro a un tipo JSON
    let params = 'json=' + json; //se definene los parametros que se mandan al api
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //tipo de peticion

    this.general.emit('Colaborador agregado');

    return this.http.post(this.url + 'colaborador', params, { headers: headers });
  }

  //Obtener los colaboradores del evento asociado (show)
  getColaboradores(idEvento): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'colaborador/' + idEvento, { headers: headers });
  }

  //Obtener colaborador por id
  getColaboradorById(idColaborador):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+'getColaborador/' +idColaborador, {headers: headers});
  }

  getTipoColaboradores(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'tipoColaborador', { headers: headers });
  }

  //Actualizar un colaborador
  editColaborador(colaborador, idColaborador){    
    let json = JSON.stringify(colaborador); 
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.general.emit('Colaborador editado');

    return this.http.put(this.url+'colaborador/' + idColaborador, params, {headers:headers});

  }

  // Eliminar colaborador
  deleteColaborador(id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.delete(this.url + 'colaborador/' + id, { headers: headers });
  }

  getGeneralEmitter(){
    return this.general;
  }
}
