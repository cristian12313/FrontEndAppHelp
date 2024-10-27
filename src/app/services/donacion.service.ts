import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Donacion} from '../model/donacion';
import {Campania} from '../model/campania';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private url=environment.apiUrl
  private http:HttpClient=inject(HttpClient);
  private listaCambio : Subject<Donacion[]> = new Subject<Donacion[]>();

  constructor() { }
  list():Observable<any> {
    return this.http.get(this.url+"/donaciones");
  }
  listID(id: number):Observable<any> {
    return this.http.get<Campania[]>(this.url+"/donacion/"+ id);
  }
  insert(donacion:Donacion):Observable<any> {
    return this.http.post(this.url+"/donacion",donacion);
  }
  update(donacion:Donacion): Observable<any>{
    return this.http.put(this.url + "/donacion", donacion);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/donacion/" + id);
  }
  setList(listaNueva: Donacion[]): void {
    this.listaCambio.next(listaNueva);
  }
  getList(): Observable<Donacion[]>{
    return this.listaCambio.asObservable();
  }
}
