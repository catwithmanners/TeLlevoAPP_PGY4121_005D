import { Injectable } from '@angular/core';
//librería para peticiones http
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //ERROR CORS: tipo de protección de algunos sitios con respecto a la información extraída de ellas.
  //para solucionar este error, se debe hacer lo sgte:
  headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE")
            .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient) { }

  //métodos para peticiones
  //get se encarga de traer toda la info de la api.
  getDatos(){
    return this.http.get('https://attackontitanapi.herokuapp.com/api/titans');
  }

  getDato(id){
    return this.http.get('https://attackontitanapi.herokuapp.com/api/titans'+id);
  }
}