import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { global } from '../../global';
@Injectable({
  providedIn: 'root'
})
export class RepositorioService {

  public url: string; //acá se guarda el http://localhost:8000/api/ que esta en global.ts

  constructor( private http: HttpClient ) { 
    this.url = global.url; 
  }

  // Guardar repositorio
  guardarRepositorio(repositorio): Observable<any>{
    let json = JSON.stringify(repositorio); //convierte el evento que se pasa por parámetro a un tipo JSON
    let params = 'json='+json; //se definene los parametros que se mandan al api
    
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //tipo de peticion
    
    return this.http.post(this.url+'repo', params, {headers: headers});
  }

  //Obtener repositorios del evento asociado (show)
  getRepositorios(idEvento):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+'repositorios/' + idEvento, {headers: headers});
  }}
