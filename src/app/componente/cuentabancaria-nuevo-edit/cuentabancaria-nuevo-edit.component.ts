import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CuentabancariaService } from '../../services/cuentabancaria.service';
import { Cuentabancaria } from '../../model/cuentabancaria';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cuentabancaria-nuevo-edit',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatLabel

  ],
  templateUrl: './cuentabancaria-nuevo-edit.component.html',
  styleUrl: './cuentabancaria-nuevo-edit.component.css'
})
export class CuentabancariaNuevoEditComponent implements OnInit{
  cuentabancariaForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  cuentabancariaService: CuentabancariaService=inject(CuentabancariaService);
  router: Router = inject(Router);
  id: number=0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    console.log("Carga constructor de Form")
    this.cuentabancariaForm = this.fb.group({
      idCuentaBanc:[''],
      nombreBanco:['', Validators.required],
      numneroCuenta:['', Validators.required],
      cci:['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Inicialización del formulario sin validaciones para evitar errores
    console.log("Carga constructor de Form")
    this.route.params.subscribe((data) => {
      console.log(data);
      this.id = data['id'];
      this.edicion = data['id']!=null;
      this.cargarForm();
    });
  }
  private cargarForm(): void {
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
    // Envío del formulario sin validaciones
    if (this.cuentabancariaForm.valid) {
      const nuevaCuentaBancaria: Cuentabancaria = this.cuentabancariaForm.value;

      this.cuentabancariaService.insert(nuevaCuentaBancaria).subscribe({
        next: (response) => {
          console.log('Cuenta bancaria registrada:', response);
          this.cuentabancariaForm.reset();
        },
        error: (error) => {
          console.error('Error al registrar la cuenta bancaria:', error);
        }
      });
    }
  }

  get f() {
    return this.cuentabancariaForm.controls;
  }
}
