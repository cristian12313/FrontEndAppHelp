import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Donacion} from '../model/donacion';
import {Campania} from '../model/campania';
import {Usuario} from '../model/usuario';
import {Tipousuario} from '../model/tipousuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url=environment.apiUrl
  private http:HttpClient=inject(HttpClient);
  private listaCambio : Subject<Usuario[]> = new Subject<Usuario[]>();

  constructor() { }
  list():Observable<any> {
    return this.http.get(this.url+"/usuarios");
  }
  listID(id: number):Observable<any> {
    return this.http.get<Tipousuario[]>(this.url+"/usuario/"+ id);
  }
  insert(usuario:Usuario):Observable<any> {
    return this.http.post(this.url+"/usuario",usuario);
  }
  update(usuario:Usuario): Observable<any>{
    return this.http.put(this.url + "/usuario", usuario);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/usuario/" + id);
  }
  setList(listaNueva: Usuario[]): void {
    this.listaCambio.next(listaNueva);
  }
  getList(): Observable<Usuario[]>{
    return this.listaCambio.asObservable();
  }
}
