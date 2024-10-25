import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DistritoService} from '../../services/distrito.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Distrito} from '../../model/distrito';
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
import {DepartamentoService} from '../../services/departamento.service';
import {Departamento} from '../../model/departamento';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-distrito-nuevo-edit',
  standalone: true,
  imports: [
    FormsModule,
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
  templateUrl: './distrito-nuevodistrito-edit.component.html',
  styleUrl: './distrito-nuevodistrito-edit.component.css'
})
export class DistritoNuevodistritoEditComponent{
  distritoForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  distritoService: DistritoService = inject(DistritoService);
  departamentoService: DepartamentoService = inject(DepartamentoService);
  router: Router = inject(Router);
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0
  public idDepartamentoSeleccionado: number = 0;
  lista: Departamento[] = [];
  idDepartamento: Departamento = new Departamento();

  constructor() {
    console.log("Carga constructor de Form")
    this.distritoForm = this.fb.group({
      idDistrito: [''],
      nombre: ['', Validators.required],
      idDepartamento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
      this.loadLista();
  }
  loadLista(): void {
    this.departamentoService.list().subscribe({
      next: (data) => this.lista = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }

  onSubmit(): void {
    if(this.distritoForm.valid){
      const distrito: Distrito = new Distrito();
      distrito.idDistrito = 0;
      distrito.nombre = this.distritoForm.value.nombre;
      distrito.idDepartamento = this.idDepartamento;
      distrito.idDepartamento.idDepartamento = this.distritoForm.value.idDepartamento;
      console.log("Distrito validado:", distrito);
      this.distritoService.insert(distrito).subscribe({
        next: (data: Object): void => {
          console.log(data);
        }
      })
      alert("Distrito registrado!")
      this.router.navigate([''])
    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }
  }

}
