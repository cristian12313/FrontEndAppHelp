import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {DepartamentoService} from '../../services/departamento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Departamento} from '../../model/departamento';
import {CuentabancariaService} from '../../services/cuentabancaria.service';
import {Cuentabancaria} from '../../model/cuentabancaria';

@Component({
  selector: 'app-cuentabancaria-nuevo-edit',
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
    MatSelectModule
  ],
  templateUrl: './cuentabancaria-nuevo-edit.component.html',
  styleUrl: './cuentabancaria-nuevo-edit.component.css'
})
export class CuentabancariaNuevoEditComponent implements OnInit{
  cuentabancariaForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  cuentabancariaService: CuentabancariaService = inject(CuentabancariaService);
  router: Router = inject(Router);
  id: number =0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    console.log("Carga constructor de Form")
    this.cuentabancariaForm = this.fb.group({
      idCuentaBanc: [''],
      nombreBanco: ['', Validators.required],
      numneroCuenta: ['', Validators.required],
      cci: ['', Validators.required],
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
  }
  private cargarForm() {
    if(this.edicion){
      this.cuentabancariaService.listID(this.id).subscribe((data:Cuentabancaria):void => {
        console.log(data);
        this.cuentabancariaForm.patchValue({
          nombreBanco:data.nombreBanco,
          numneroCuenta:data.numneroCuenta,
          cci:data.cci
        });
      });
    }
  }
  onSubmit(): void {
    if(this.cuentabancariaForm.valid){
      const cuentabancaria:Cuentabancaria = new Cuentabancaria();
      cuentabancaria.idCuentaBanc = this.id;
      cuentabancaria.nombreBanco = this.cuentabancariaForm.value.nombreBanco;
      cuentabancaria.numneroCuenta = this.cuentabancariaForm.value.numneroCuenta;
      cuentabancaria.cci = this.cuentabancariaForm.value.cci;
      if(!this.edicion){
        this.cuentabancariaService.insert(cuentabancaria).subscribe((data:Object): void => {
          this.cuentabancariaService.list().subscribe(data => {
            this.cuentabancariaService.setList(data);
          })
        })
      }else{
        this.cuentabancariaService.update(cuentabancaria).subscribe((data:Object): void => {
          this.cuentabancariaService.list().subscribe(data => {
            this.cuentabancariaService.setList(data);
          })
        })
      }
      this.router.navigate(['/dashboard/cuentabancarias']);
    }else{
      console.log("Formulario no valido");
      alert("Formulario no valido");
    }
  }
}
