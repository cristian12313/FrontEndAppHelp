import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Donacion} from '../model/donacion';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private url=environment.apiUrl
  private http:HttpClient=inject(HttpClient);
  constructor() { }
  list():Observable<any> {
    return this.http.get(this.url+"/donaciones");
  }
  listID(id:number):Observable<any> {
    return this.http.get(this.url+"/donacion/"+id);
  }
  insert(donacion:Donacion):Observable<any> {
    return this.http.post(this.url+"/donacion",donacion);
  }
  updte(donacion:Donacion):Observable<any> {
    return this.http.put(this.url+"/donacion",donacion);
  }
  delete(id:number):Observable<any> {
    return this.http.delete(this.url+"/donacion/"+id);
  }
}
