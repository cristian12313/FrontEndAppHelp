import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {Distrito} from '../model/distrito';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Distrito[]> = new Subject<Distrito[]>();

  constructor() { }
  list(): Observable<any> {
    return this.http.get(this.url +"/distritos");
  }

  listID(id: number): Observable<any> {
    return this.http.get(this.url +"/distrito/"+id);
  }

  insert(distrito: Distrito): Observable<any> {
    return this.http.post(this.url +"/distrito",distrito);
  }

  update(distrito: Distrito): Observable<any> {
    return this.http.put(this.url +"/distrito", distrito);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url +"/distrito/" + id);
  }

  setList(listaNueva: Distrito[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Distrito[]> {
    return this.listaCambio.asObservable();
  }
}
