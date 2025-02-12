import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {Departamento} from '../model/departamento';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private url = environment.apiUrl+"/api";
  //para el uso de HttClient se debe registrar en app.config.ts cómo provider a
  // provideHttpClient()

  private http: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Departamento[]> = new Subject<Departamento[]>();

  constructor() {
  }

  list(): Observable<any> {
    return this.http.get<Departamento[]>(this.url + "/departamentos");
  }

  listID(id: number): Observable<any> {
    return this.http.get<Departamento[]>(this.url + "/departamento/" + id);
  }

  insert(departamento: Departamento): Observable<any> {
    return this.http.post(this.url + "/departamento", departamento);
  }

  update(departamento: Departamento): Observable<any> {
    return this.http.put(this.url + "/departamento", departamento);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + "/departamento/" + id);
  }

  setList(listaNueva: Departamento[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Departamento[]> {
    return this.listaCambio.asObservable();
  }
}
