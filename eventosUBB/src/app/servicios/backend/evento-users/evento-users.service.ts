import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class EventoUsersService {

  public url: string;

  constructor( private http: HttpClient ) {
    this.url = global.url; 
  }

  // obtener eventos
  getEventoUsersById(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    return this.http.get(this.url+'evento_users/' + id, {headers: headers});
  }

  // obtener mis eventos
  getMisEventos(token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization',token);

    return this.http.get(this.url+'misEventos', {headers: headers});
  }

   guardarEventoUser(token,eventoUsers): Observable<any>{
    let json = JSON.stringify(eventoUsers); //convierte el evento que se pasa por parámetro a un tipo JSON
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization',token);
    
    return this.http.post(this.url+'evento_users', params, {headers: headers});
  }


  // guardarEventoUsers(token,eventoUsers): Observable<any>{
  //   let json = JSON.stringify(eventoUsers); 
  //   let params = 'json='+json;
    
  //   let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  //   .set('Authorization',token);
    
  //   return this.http.put(this.url+'evento_users', params, {headers: headers});
  // }


  participarEvento(token, eventoUsers, id): Observable<any>{
    let json = JSON.stringify(eventoUsers);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization',token);

    return this.http.put(this.url+'evento_users/' + id, params, {headers: headers});
  }


}
