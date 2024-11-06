import {Campania} from './campania';
import {Tipodonacion} from './tipodonacion';

export class Donacion {
  idDonacion: number;
  ubicacion: string;
  monto: number;
  fechaInicio:Date=new Date();
  fechaFin: Date=new Date();
  detalle: string;
  campania: Campania;
  tipodonacion:Tipodonacion;
}
