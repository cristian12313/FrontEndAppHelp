import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Tipousuario} from '../model/tipousuario';
import {Usuario} from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {
  private url=environment.apiUrl
  private http:HttpClient=inject(HttpClient);
  private listaCambio : Subject<Tipousuario[]> = new Subject<Tipousuario[]>();

  constructor() { }

  list():Observable<any> {
    return this.http.get(this.url+"/tipousuarios");
  }
  listID(id: number):Observable<any> {
    return this.http.get<Usuario[]>(this.url+"/tipousuario/"+ id);
  }

  insert(tipousuario:Tipousuario):Observable<any> {
    return this.http.post(this.url+"/tipousuario",tipousuario);
  }
  update(tipousuario:Tipousuario): Observable<any>{
    return this.http.put(this.url + "/tipousuario", tipousuario);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/tipousuario/" + id);
  }
  setList(listaNueva: Tipousuario[]): void {
    this.listaCambio.next(listaNueva);
  }
  getList(): Observable<Tipousuario[]>{
    return this.listaCambio.asObservable();
  }
}
