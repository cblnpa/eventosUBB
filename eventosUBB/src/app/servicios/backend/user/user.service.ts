import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../global';
import { Router } from '@angular/router';

import { users } from '../../../model/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity;
  public token;

  constructor( private http: HttpClient, private router: Router ) { 
    this.url = global.url;
  }

  register(users): Observable<any>{
    let json = JSON.stringify(users);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url+'register', params, {headers: headers});
  }

  signUpGoogle(): Observable<any>{
    
    return this.http.get(this.url+'login/google/callback');

  }

  signUp(users, gettoken = null): Observable<any>{
    if(gettoken != null){
      users.gettoken = 'true';
    }

    let json = JSON.stringify(users);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url+'login', params, {headers: headers});
  }
  update(token, user):Observable<any>{
    let json = JSON.stringify(user);
    let params = "json="+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization',token);

    return this.http.put(this.url+'user/update', params, {headers: headers});


  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity && identity != "undefined"){
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token && token != "undefined"){
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  logout(){

    this.token = null;
    this.identity = null;

    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }
}
