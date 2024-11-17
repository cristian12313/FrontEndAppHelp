import {Campania} from './campania';
import {Tipodonacion} from './tipodonacion';
import {Estado} from './estados';

export class Donacion {
  idDonacion: number;
  ubicacion: string;
  monto: number;
  fechaInicio:Date=new Date();
  fechaFin: Date=new Date();
  detalle: string;
  campania: Campania;
  tipodonacion:Tipodonacion;
  estado:Estado;
}
