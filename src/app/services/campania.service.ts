import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {Campania} from '../model/campania';
import {Observable, Subject} from 'rxjs';
import {Donacion} from '../model/donacion';
import {Departamento} from '../model/departamento';

@Injectable({
  providedIn: 'root'
})
export class CampaniaService {
  private url = environment.apiUrl+"/api";
  //para el uso de HttClient se debe registrar en app.config.ts cómo provider a
  // provideHttpClient()
  private http:HttpClient=inject(HttpClient);
  private listaCambio : Subject<Campania[]> = new Subject<Campania[]>();

  constructor() { }

  list():Observable<any> {
    return this.http.get<Campania[]>(this.url+"/campanias");
  }
  listID(id: number):Observable<any> {
    return this.http.get<Donacion[]>(this.url+"/campania/"+ id);
  }

  insert(campania:Campania):Observable<any> {
    return this.http.post(this.url+"/campania",campania);
  }
  updte(campania:Campania): Observable<any>{
    return this.http.put(this.url + "/campania", campania);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/campania/" + id);
  }
  setList(listaNueva: Campania[]): void {
    this.listaCambio.next(listaNueva);
  }
  getList(): Observable<Campania[]>{
    return this.listaCambio.asObservable();
  }
}
