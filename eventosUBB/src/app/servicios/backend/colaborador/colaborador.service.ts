import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { global } from '../../global';

import { colaborador } from '../../../model/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = global.url;
   }

   guardarColaborador(colaborador): Observable<any>{
     let json = JSON.stringify(colaborador);
     let params = 'json='+json;

     let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

     return this.http.post(this.url+'colaborador', params, {headers: headers});
   }
}
