import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Estado} from '../model/estados';
import {Departamento} from '../model/departamento';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private url = environment.apiUrl+"/api";
  //para el uso de HttClient se debe registrar en app.config.ts cómo provider a
  // provideHttpClient()
  private http: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Estado[]> = new Subject<Estado[]>();

  constructor() {
  }

  list(): Observable<any> {
    return this.http.get<Estado[]>(this.url + "/estados");
  }

  listID(id: number): Observable<any> {
    return this.http.get<Estado[]>(this.url + "/estado/" + id);
  }

  insert(estado: Estado): Observable<any> {
    return this.http.post(this.url + "/estado", estado);
  }

  update(estado: Estado): Observable<any> {
    return this.http.put(this.url + "/estado", estado);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + "/estado/" + id);
  }

  setList(listaNueva: Estado[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Estado[]> {
    return this.listaCambio.asObservable();
  }
}
