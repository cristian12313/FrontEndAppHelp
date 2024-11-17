import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Tipobeneficiario} from '../model/tipobeneficiario';
import {Departamento} from '../model/departamento';

@Injectable({
  providedIn: 'root'
})
export class TipobeneficiarioService {
  private url = environment.apiUrl+"/api";
  //para el uso de HttClient se debe registrar en app.config.ts cómo provider a
  // provideHttpClient()
  private http: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Tipobeneficiario[]> = new Subject<Tipobeneficiario[]>();

  constructor() {
  }

  list(): Observable<any> {
    return this.http.get<Tipobeneficiario[]>(this.url + "/tipobeneficiarios");
  }

  listID(id: number): Observable<any> {
    return this.http.get<Tipobeneficiario[]>(this.url + "/tipobeneficiario/" + id);
  }

  insert(tipobeneficiario: Tipobeneficiario): Observable<any> {
    return this.http.post(this.url + "/tipobeneficiario", tipobeneficiario);
  }

  update(tipobeneficiario: Tipobeneficiario): Observable<any> {
    return this.http.put(this.url + "/tipobeneficiario", tipobeneficiario);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + "/tipobeneficiario/" + id);
  }

  setList(listaNueva: Tipobeneficiario[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Tipobeneficiario[]> {
    return this.listaCambio.asObservable();
  }
}
