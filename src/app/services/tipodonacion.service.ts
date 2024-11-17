import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Departamento} from '../model/departamento';
import {Tipodonacion} from '../model/tipodonacion';

@Injectable({
  providedIn: 'root'
})
export class TipodonacionService {
  private url = environment.apiUrl+"/api";
  //para el uso de HttClient se debe registrar en app.config.ts cómo provider a
  // provideHttpClient()
  private http: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Tipodonacion[]> = new Subject<Tipodonacion[]>();

  constructor() {
  }

  list(): Observable<any> {
    return this.http.get<Tipodonacion[]>(this.url + "/tipoDonaciones");
  }

  listID(id: number): Observable<any> {
    return this.http.get<Tipodonacion[]>(this.url + "/tipoDonacion/" + id);
  }

  insert(tipodonacion: Tipodonacion): Observable<any> {
    return this.http.post(this.url + "/tipoDonacion", tipodonacion);
  }

  update(tipodonacion: Tipodonacion): Observable<any> {
    return this.http.put(this.url + "/tipoDonacion", tipodonacion);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + "/tipoDonacion/" + id);
  }

  setList(listaNueva: Tipodonacion[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Tipodonacion[]> {
    return this.listaCambio.asObservable();
  }
}
