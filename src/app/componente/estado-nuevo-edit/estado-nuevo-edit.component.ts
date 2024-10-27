import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoService } from '../../services/estado.service';
import { Estado } from '../../model/estado';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-estado-nuevo-edit',
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
  templateUrl: './estado-nuevo-edit.component.html',
  styleUrls: ['./estado-nuevo-edit.component.css']
})
export class EstadoNuevoEditComponent implements OnInit {
  estadoForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  estadoService: EstadoService = inject(EstadoService);
  router: Router = inject(Router);
  id: number = 0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  estados: Estado[] = []; // Almacena los estados disponibles

  constructor() {
    console.log("Carga constructor de Form");
    this.estadoForm = this.fb.group({
      idEstado: [''],
      nombre: ['', Validators.required] // Cambio aquí para incluir el control `estado`
    });
  }

  ngOnInit(): void {
    console.log("Carga ngOnInit de Form")
    this.cargarEstados(); // Carga la lista de estados desde el servicio
    this.route.params.subscribe((data): void => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargarForm();
    });
  }

  cargarEstados(): void {
    this.estadoService.list().subscribe({
      next: (data: Estado[]) => {
        this.estados = data;
      },
      error: (error) => {
        console.error("Error al cargar los estados:", error);
      }
    });
  }

  private cargarForm(): void {
    if (this.edicion) {
      this.estadoService.listID(this.id).subscribe((data: Estado): void => {
        this.estadoForm.patchValue({
          estado: data.nombre // Cambia `nombre` por `estado` si es necesario
        });
      });
    }
  }

  onSubmit(): void {
    if (this.estadoForm.valid) {
      const nuevoEstado: Estado = this.estadoForm.value;
      console.log('Datos enviados:', nuevoEstado); // Verificar datos enviados
      this.estadoService.insert(nuevoEstado).subscribe({
        next: (response) => {
          console.log('Estado registrado:', response);
          this.estadoForm.reset();
          this.router.navigate(['/estado']); // Redirige a la lista de estados después de registrar
        },
        error: (error) => {
          console.error('Error al registrar el estado:', error);
        }
      });
    }
  }


  get f() {
    return this.estadoForm.controls;
  }
}
