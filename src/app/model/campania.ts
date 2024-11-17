import {Cuentabancaria} from './cuentabancaria';
import {Tipobeneficiario} from './tipobeneficiario';
import {Tipodonacion} from './tipodonacion';

export class Campania {
  idCampania:number;
  culminado:boolean;
  descripcion:string;
  nombre:string;
  ubicacion:string;
  cuentabancaria:Cuentabancaria;
  tipobeneficiario:Tipobeneficiario;
  tipodonacion:Tipodonacion;
}
