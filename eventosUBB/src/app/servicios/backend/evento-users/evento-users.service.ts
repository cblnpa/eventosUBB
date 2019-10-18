import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class EventoUsersService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  // Obtener eventos de dicho usuario con su id
  getEventoUsersById(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'evento_users/' + id, { headers: headers });
  }

  // Obtener los eventos en los que participa el usuario (ahora pasa el id -sub- para obtenerlos)
  getMisEventos(sub): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'misEventos/' + sub, { headers: headers });
  }

  // Obtener los eventos que administra el usuario (ahora pasa el id -sub- para obtenerlos)
  getMisEventosAdmin(sub): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'misEventosAdmin/' + sub, { headers: headers });
  }

  // Obtener los eventos que administra el usuario (ahora pasa el id -sub- para obtenerlos)
  getMisEventosAdmin2(sub): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'misEventosAdmin2/' + sub, { headers: headers });
  }

  // Crear una tupla en la tabla evento_users -> también lo utiliza el ParticiparEvento para guardar el participante 
  guardarEventoUser( eventoUsers, idUsuario): Observable<any> {
    let json = JSON.stringify(eventoUsers);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + 'evento_users/' + idUsuario , params, { headers: headers });
  }

  // Eliminar un evento 
  deleteEvento(token, id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this.http.delete(this.url + 'evento_users/' + id, { headers: headers });
  }

  //Función para agregar una comisión al evento asociado en el request
  crearComision(email, idEvento): Observable<any>{
    let json = JSON.stringify(email);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + 'comision/' + idEvento , params, { headers: headers });
  }

  //Función para obtener los roles del evento
  getUsuarios(idEvento, idUsuario): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+'evento_users/'+idEvento+'/'+idUsuario, {headers: headers});
  }

  //Obtener todos los usuarios pertenecientes al evento
  getAllUsuariosByEvent(idEvento): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+ 'getUsersByEventoId/' + idEvento, {headers});
  }

}
