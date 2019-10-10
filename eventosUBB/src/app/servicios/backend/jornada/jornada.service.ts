import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  public url: string; //acá se guarda el http://localhost:8000/api/ que esta en global.ts

  public general = new EventEmitter();

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  // Guardar una jornada
  guardarJornada(jornada): Observable<any> {
    let json = JSON.stringify(jornada); //convierte el evento que se pasa por parámetro a un tipo JSON
    let params = 'json=' + json; //se definene los parametros que se mandan al api
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //tipo de peticion

    this.general.emit('Datos Atualizados');

    return this.http.post(this.url + 'jornada', params, { headers: headers });
  }

  //Obtener las jornadas del evento asociado (show)
  getJornadas(idEvento): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'jornada/' + idEvento, { headers: headers });
  }

  //Obtener jornada por id
  getJornadaById(idJornada):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+'getJornada/' +idJornada, {headers: headers});
  }

  // Eliminar una jornada 
  deleteJornada(id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.delete(this.url + 'jornada/' + id, { headers: headers });
  }

  //Actualizar una jornada
  editJornada(jornada, idJornada){    
    let json = JSON.stringify(jornada); 
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.general.emit('Jornada editada');
    
    return this.http.put(this.url+'jornada/' + idJornada, params, {headers:headers});
  }

  getGeneralEmitter(){
    return this.general;
  }

}
