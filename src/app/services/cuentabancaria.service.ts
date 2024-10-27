import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Cuentabancaria} from '../model/cuentabancaria';

@Injectable({
  providedIn: 'root'
})
export class CuentabancariaService {
  private url=environment.apiUrl
  private http:HttpClient=inject(HttpClient);
  constructor() { }
  list():Observable<any> {
    return this.http.get(this.url+"/Cuentabancarias");
  }
  listID(id:number):Observable<any> {
    return this.http.get(this.url+"/Cuentabancaria/"+id);
  }


  insert(cuentabancaria:Cuentabancaria):Observable<any> {
    return this.http.post(`${this.url}/Cuentabancaria`, cuentabancaria).pipe(
      catchError((error) => {
        console.error('Error en la inserción de cuenta bancaria:', error);
        return throwError(() => error);
      })
    );
  }
  update(cuentabancaria:Cuentabancaria):Observable<any> {
    return this.http.put(this.url+"/Cuentabancaria",cuentabancaria);
  }
  delete(id:number):Observable<any> {
    return this.http.delete(this.url+"/Cuentabancaria/"+id);
  }
}
