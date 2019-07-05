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
