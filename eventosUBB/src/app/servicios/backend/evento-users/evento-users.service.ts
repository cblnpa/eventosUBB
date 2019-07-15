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

  // Obtener eventos de dicho usuario con su id
  getEventoUsersById(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    return this.http.get(this.url+'evento_users/' + id, {headers: headers});
  }

  // Obtener mis eventos usuario-> participante (eventos en los que se participa)
  getMisEventos(token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization',token);

    return this.http.get(this.url+'misEventos', {headers: headers});
  }

  // Obtener mis eventos usuario-> administrador (eventos que administra)
  getMisEventosAdmin(token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization',token);
    
    return this.http.get(this.url+'misEventosAdmin', {headers: headers});
  }

  // Crear una tupla en la tabla evento_users -> también lo utiliza el ParticiparEvento para guardar el participante 
  guardarEventoUser(token,eventoUsers): Observable<any>{
    let json = JSON.stringify(eventoUsers); 
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization',token);
    
    return this.http.post(this.url+'evento_users', params, {headers: headers});
  }

  // Eliminar un evento 
  deleteEvento(token, id){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization',token);

    return this.http.delete(this.url+'evento_users/'+id, {headers: headers});

  }

}
