import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipobeneficiarioService } from '../../services/tipobeneficiario.service';
import { Tipobeneficiario } from '../../model/tipobeneficiario';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tipobeneficiario-nuevo-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './tipobeneficiario-nuevo-edit.component.html',
  styleUrls: ['./tipobeneficiario-nuevo-edit.component.css']
})
export class TipobeneficiarioNuevoEditComponent implements OnInit {
  tipobeneficiarioForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  tipobeneficiarioService: TipobeneficiarioService = inject(TipobeneficiarioService);
  router: Router = inject(Router);
  id: number = 0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    console.log("Carga constructor de Form");
    this.tipobeneficiarioForm = this.fb.group({
      idTipobene: [''],
      nombre: ['', Validators.required] // Usamos 'nombre' como campo select
    });
  }

  ngOnInit(): void {
    console.log("Carga constructor de Form");
    this.route.params.subscribe((data): void => {
      console.log(data);
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargarForm();
    });
  }

  private cargarForm(): void {
    if (this.edicion) {
      this.tipobeneficiarioService.listID(this.id).subscribe((data: Tipobeneficiario): void => {
        console.log(data);
        this.tipobeneficiarioForm.patchValue({
          nombre: data.nombre
        });
      });
    }
  }

  onSubmit(): void {
    if (this.tipobeneficiarioForm.valid) {
      const nuevoBeneficiario: Tipobeneficiario = this.tipobeneficiarioForm.value;
      this.tipobeneficiarioService.insert(nuevoBeneficiario).subscribe({
        next: (response) => {
          console.log('Tipo Beneficiario registrado:', response);
          this.tipobeneficiarioForm.reset();
          this.router.navigate(['/tipobeneficiario']); // Cambia a la ruta válida para la lista de beneficiarios
        },
        error: (error) => {
          console.error('Error al registrar el Tipo Beneficiario:', error);
        }
      });
    }
  }

  get f() {
    return this.tipobeneficiarioForm.controls;
  }
}

