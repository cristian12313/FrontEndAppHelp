import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tipobeneficiario} from '../model/tipobeneficiario';

@Injectable({
  providedIn: 'root'
})
export class TipobeneficiarioService {
  private url=environment.apiUrl
  private http:HttpClient=inject(HttpClient);
  constructor() { }
  list():Observable<any> {
    return this.http.get(this.url+"/tipobeneficiarios");
  }
  listID(id:number):Observable<any> {
    return this.http.get(this.url+"/tipobeneficiario/"+id);
  }
  insert(tipobeneficiario:Tipobeneficiario):Observable<any> {
    return this.http.post(this.url+"/tipobeneficiario",tipobeneficiario);
  }
  update(tipobeneficiario:Tipobeneficiario):Observable<any> {
    return this.http.put(this.url+"/tipobeneficiario",tipobeneficiario);
  }
  delete(id:number):Observable<any> {
    return this.http.delete(this.url+"/tipobeneficiario/"+id);
  }
}
