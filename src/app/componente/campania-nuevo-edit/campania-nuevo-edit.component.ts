import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CampaniaService} from '../../services/campania.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Campania} from '../../model/campania';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {TipodonacionService} from '../../services/tipodonacion.service';
import {Tipodonacion} from '../../model/tipodonacion';
import {EstadoService} from '../../services/estado.service';
import {Estado} from '../../model/estados';
import {CuentabancariaService} from '../../services/cuentabancaria.service';
import {Cuentabancaria} from '../../model/cuentabancaria';
import {TipobeneficiarioService} from '../../services/tipobeneficiario.service';
import {Tipobeneficiario} from '../../model/tipobeneficiario';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-campania-nuevo-edit',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent, MatLabel, MatHint,
    ReactiveFormsModule,
    MatFormField,
    MatDatepickerInput,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule, NgForOf
  ],
  templateUrl: './campania-nuevo-edit.component.html',
  styleUrl: './campania-nuevo-edit.component.css'
})
export class CampaniaNuevoEditComponent implements OnInit{
  campaniaForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  campaniaService: CampaniaService = inject(CampaniaService);
  router: Router = inject(Router);
  id: number =0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  //CUENTA BANCARIA
  cuentabancariaService: CuentabancariaService = inject(CuentabancariaService);
  public idCuentaSeleccionado: number = 0;
  lista10: Cuentabancaria[] = [];
  cuentabancaria: Cuentabancaria = new Cuentabancaria();

  //TIPO BENEFICIARIO
  tipobeneficiarioService: TipobeneficiarioService = inject(TipobeneficiarioService);
  public idTipoBeneficiarioSeleccionado: number = 0;
  lista11: Tipobeneficiario[] = [];
  tipobeneficiario: Tipobeneficiario = new Tipobeneficiario();

  constructor() {
    console.log("Carga constructor de Form")
    this.campaniaForm = this.fb.group({
      idCampania: [''],
      culminado: ['false', Validators.required],
      descripcion: ['', Validators.required],
      nombre: ['', Validators.required],
      ubicacion: ['', [Validators.required]],
      //
      cuentabancaria: ['', [Validators.required]],
      tipobeneficiario: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    console.log("Carga ngOnInit de Form")
    this.route.params.subscribe((data) => {
      console.log(data);
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargarForm();
    });
    //
    this.loadLista();
  }
  loadLista(): void {
    this.cuentabancariaService.list().subscribe({
      next: (data) => this.lista10 = data,
      error: (err) => console.error("Error en consulta", err)
    })
    //
    this.tipobeneficiarioService.list().subscribe({
      next: (data) => this.lista11 = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }
  private cargarForm() {
    if(this.edicion){
      this.campaniaService.listID(this.id).subscribe((data:Campania):void => {
        console.log(data);
        this.campaniaForm.patchValue({
          culminado:data.culminado,
          descripcion:data.descripcion,
          nombre:data.nombre,
          ubicacion:data.ubicacion,
          //
          cuentabancaria:data.cuentabancaria,
          tipobeneficiario:data.tipobeneficiario
        });
      });
    }
  }
  onSubmit(): void {
    if(this.campaniaForm.valid){
      const campania:Campania = new Campania();
      campania.idCampania = this.id;
      campania.culminado = this.campaniaForm.value.culminado;
      campania.descripcion = this.campaniaForm.value.descripcion;
      campania.nombre = this.campaniaForm.value.nombre;
      campania.ubicacion = this.campaniaForm.value.ubicacion;
      //
      campania.cuentabancaria = this.cuentabancaria;
      campania.cuentabancaria.idCuentaBanc = this.campaniaForm.value.cuentabancaria;
      //
      campania.tipobeneficiario = this.tipobeneficiario;
      campania.tipobeneficiario.idTipobene = this.campaniaForm.value.tipobeneficiario;
      if(!this.edicion){
        this.campaniaService.insert(campania).subscribe((data:Object): void => {
          this.campaniaService.list().subscribe(data => {
            this.campaniaService.setList(data);
          })
        })
      }else{
        this.campaniaService.update(campania).subscribe((data:Object): void => {
          this.campaniaService.list().subscribe(data => {
            this.campaniaService.setList(data);
          })
        })
      }
      this.router.navigate(['/dashboard/campanias']);
    }else{
      console.log("Formulario no valido");
      alert("Formulario no valido");
    }
  }
}
