import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Estado} from '../model/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private url=environment.apiUrl
  private http:HttpClient=inject(HttpClient);

  constructor() { }
  list():Observable<any> {
    return this.http.get(this.url+"/estados");
  }
  listID(id:number):Observable<any> {
    return this.http.get(this.url+"/estado/"+id);
  }
  insert(estado:Estado):Observable<any> {
    return this.http.post(this.url+"/estado",estado);
  }
  update(estado:Estado):Observable<any> {
    return this.http.put(this.url+"/estado",estado);
  }
  delete(id:number):Observable<any> {
    return this.http.delete(this.url+"/estado/"+id);
  }
}
