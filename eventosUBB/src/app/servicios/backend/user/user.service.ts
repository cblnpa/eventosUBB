import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../global';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity;
  public token;

  constructor( private http: HttpClient, private router: Router ) { 
    
    this.cargarStorage();
    this.url = global.url;
    
  }

  getAll(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+'getAll', {headers: headers});
  }

  // Registrar usuario 
  register(users): Observable<any>{
    let json = JSON.stringify(users);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url+'register', params, {headers: headers});
  }

  // Iniciar sesión con Google
  loginGoogle(googleToken, gettoken = null): Observable<any> {
    if(gettoken != null){
      googleToken.gettoken = 'true';
    }

    let json = JSON.stringify(googleToken);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url+'google', params, {headers: headers});
  }

  // Iniciar sesión normal
  signUp(users, gettoken = null): Observable<any>{
    if(gettoken != null){
      users.gettoken = 'true';
    }

    let json = JSON.stringify(users);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url+'login', params, {headers: headers});
  }

  // Modificar usuario 
  update(users, idUsuario):Observable<any>{
    let json = JSON.stringify(users);
    let params = "json="+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.put(this.url+'user/update/' + idUsuario, params, {headers: headers});

  }

  // Obtener identity
  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity && identity != "undefined"){
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  // Obtener token
  getToken(){
    let token = localStorage.getItem('token');

    if(token && token != "undefined"){
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  // Cerrar sesión 
  logout(){

    this.token = null;
    this.identity = null;

    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }

  // Estado del login *para el guard
  statusLogin(){
    return ( this.token.length > 5 ) ? true: false;
  }

  // Obtener Storage
  cargarStorage(){
    if (localStorage.getItem('token')){
      this.token =  localStorage.getItem('token');
      this.identity = JSON.parse(localStorage.getItem('users'));
    } else {
      this.token = '';
      this.identity = null;
    }
  }

  


}
