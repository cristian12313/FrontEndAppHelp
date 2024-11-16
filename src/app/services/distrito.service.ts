import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {Distrito} from '../model/distrito';
import {Observable, Subject} from 'rxjs';
import {Campania} from '../model/campania';
import {Departamento} from '../model/departamento';


@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  private url = environment.apiUrl+"/api";
  //para el uso de HttClient se debe registrar en app.config.ts cómo provider a
  // provideHttpClient()
  private http: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Distrito[]> = new Subject<Distrito[]>();

  constructor() { }
  list(): Observable<any> {
    return this.http.get<Distrito[]>(this.url +"/distritos");
  }

  listID(id: number): Observable<any> {
    return this.http.get<Departamento[]>(this.url +"/distrito/"+id);
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
