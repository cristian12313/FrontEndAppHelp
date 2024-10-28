import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Cuentabancaria} from '../model/cuentabancaria';

@Injectable({
  providedIn: 'root'
})
export class CuentabancariaService {
  private url=environment.apiUrl
  private http:HttpClient=inject(HttpClient);
  private listaCambio : Subject<Cuentabancaria[]> = new Subject<Cuentabancaria[]>();

  constructor() { }

  list():Observable<any> {
    return this.http.get(this.url+"/cuentabancarias");
  }
  listID(id: number):Observable<any> {
    return this.http.get(this.url+"/cuentabancaria/"+ id);
  }

  insert(cuentabancaria:Cuentabancaria):Observable<any> {
    return this.http.post(this.url+"/cuentabancaria",cuentabancaria);
  }
  update(cuentabancaria:Cuentabancaria): Observable<any>{
    return this.http.put(this.url + "/cuentabancaria", cuentabancaria);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/cuentabancaria/" + id);
  }
  setList(listaNueva: Cuentabancaria[]): void {
    this.listaCambio.next(listaNueva);
  }
  getList(): Observable<Cuentabancaria[]>{
    return this.listaCambio.asObservable();
  }
}
