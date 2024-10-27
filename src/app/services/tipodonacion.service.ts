import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tipodonacion} from '../model/tipodonacion';

@Injectable({
  providedIn: 'root'
})
export class TipodonacionService {
  private url=environment.apiUrl
  private http:HttpClient=inject(HttpClient);

  constructor() { }
  list():Observable<any> {
    return this.http.get(this.url+"/tipoDonaciones");
  }
  listID(id:number):Observable<any> {
    return this.http.get(this.url+"/tipoDonacion/"+id);
  }
  insert(tipodonacion:Tipodonacion):Observable<any> {
    return this.http.post(this.url+"/tipoDonacion",tipodonacion);
  }
  update(tipodonacion:Tipodonacion):Observable<any> {
    return this.http.put(this.url+"/tipoDonacion",tipodonacion);
  }
  delete(id:number):Observable<any> {
    return this.http.delete(this.url+"/tipoDonacion/"+id);
  }
}
