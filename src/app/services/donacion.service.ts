import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Donacion} from '../model/donacion';
import {Campania} from '../model/campania';



@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private url = environment.apiUrl+"/api";
  //para el uso de HttClient se debe registrar en app.config.ts cómo provider a
  // provideHttpClient()
  private http:HttpClient=inject(HttpClient);
  private listaCambio : Subject<Donacion[]> = new Subject<Donacion[]>();

  constructor() { }
  list():Observable<any> {
    return this.http.get<Donacion[]>(this.url+"/donaciones");
  }
  listID(id: number):Observable<any> {
    return this.http.get<Campania[]>(this.url+"/donacion/"+ id);
  }
  insert(donacion:Donacion):Observable<any> {
    return this.http.post(this.url+"/donacion",donacion);
  }
  update(donacion:Donacion): Observable<any>{
    return this.http.put(this.url + "/donacion", donacion);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/donacion/" + id);
  }
  setList(listaNueva: Donacion[]): void {
    this.listaCambio.next(listaNueva);
  }
  getList(): Observable<Donacion[]>{
    return this.listaCambio.asObservable();
  }

  // CONSULTAS
// Llamada para obtener las donaciones económicas por campaña
  listarDonacionesEcoRecaudacionPorCampania(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "/donacionesEcoRecaudacionPorCampania/");
  }
  // Método para obtener donaciones por campaña
  getDonacionesPorCampania(pCampania: string): Observable<any[]> {
    return this.http.get<any[]>(this.url +"/donacionesPorCampaniaOrdFecha/${pCampania}");
  }

}
