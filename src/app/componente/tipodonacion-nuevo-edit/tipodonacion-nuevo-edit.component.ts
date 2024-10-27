import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipodonacionService } from '../../services/tipodonacion.service';
import { Tipodonacion } from '../../model/tipodonacion';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tipodonacion-nuevo-edit',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatLabel
  ],
  templateUrl: './tipodonacion-nuevo-edit.component.html',
  styleUrls: ['./tipodonacion-nuevo-edit.component.css']
})
export class TipodonacionNuevoEditComponent implements OnInit {
  tipodonacionForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  tipodonacionService: TipodonacionService = inject(TipodonacionService);
  router: Router = inject(Router);
  id: number = 0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    console.log("Carga constructor de Form");
    this.tipodonacionForm = this.fb.group({
      idTipodonacion: [''],
      nombre: ['', Validators.required] // Campo para el tipo de donación
    });
  }

  ngOnInit(): void {
    console.log("Carga ngOnInit de Form")
    this.route.params.subscribe((data): void => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargarForm();
    });
  }

  private cargarForm(): void {
    if (this.edicion) {
      this.tipodonacionService.listID(this.id).subscribe((data: Tipodonacion): void => {
        this.tipodonacionForm.patchValue({
          nombre: data.nombre
        });
      });
    }
  }

  onSubmit(): void {
    if (this.tipodonacionForm.valid) {
      const nuevaTipodonacion: Tipodonacion = this.tipodonacionForm.value;
      this.tipodonacionService.insert(nuevaTipodonacion).subscribe({
        next: (response) => {
          console.log('Tipo de Donación registrada:', response);
          this.tipodonacionForm.reset();
          this.router.navigate(['/tipodonacion']); // Redirige a la lista de tipos de donación después de registrar
        },
        error: (error) => {
          console.error('Error al registrar el tipo de donación:', error);
        }
      });
    }
  }

  get f() {
    return this.tipodonacionForm.controls;
  }
}

