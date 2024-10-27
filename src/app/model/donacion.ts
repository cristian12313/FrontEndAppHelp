import {Campania} from './campania';

export class Donacion {
  idDonacion: number;
  ubicacion: string;
  monto: number;
  fechaInicio:Date=new Date();
  fechaFin: Date=new Date();
  detalle: string;
  campania: Campania;
}
