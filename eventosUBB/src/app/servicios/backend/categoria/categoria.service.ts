import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { global } from '../../global';
import { categoria } from '../../../model/categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public url: string;

  constructor( private http: HttpClient ) { 
    this.url = global.url; 
  }

  getCategorias():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'categoria', {headers: headers});
  }
}
