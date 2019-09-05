import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  public url: string; //acá se guarda el http://localhost:8000/api/ que esta en global.ts

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  // Guardar un colaborador
  guardarColaborador(colaborador): Observable<any> {
    let json = JSON.stringify(colaborador); //convierte el evento que se pasa por parámetro a un tipo JSON
    let params = 'json=' + json; //se definene los parametros que se mandan al api

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //tipo de peticion

    return this.http.post(this.url + 'colaborador', params, { headers: headers });
  }

  //Obtener los colaboradores del evento asociado (show)
  getColaboradores(idEvento): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'colaborador/' + idEvento, { headers: headers });
  }

  getTipoColaboradores(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'tipoColaborador', { headers: headers });
  }
}
