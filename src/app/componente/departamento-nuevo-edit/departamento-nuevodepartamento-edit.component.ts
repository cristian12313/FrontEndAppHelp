import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DepartamentoService} from '../../services/departamento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Departamento} from '../../model/departamento';
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


@Component({
  selector: 'app-departamento-nuevo-edit',
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
  templateUrl: './departamento-nuevodepartamento-edit.component.html',
  styleUrl: './departamento-nuevodepartamento-edit.component.css'
})
export class DepartamentoNuevodepartamentoEditComponent implements OnInit{
  departamentoForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  departamentoService: DepartamentoService = inject(DepartamentoService);
  router: Router = inject(Router);
  id: number =0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    console.log("Carga constructor de Form")
    this.departamentoForm = this.fb.group({
      idDepartamento: [''],
      nombreDepartamento: ['', Validators.required],
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
      this.departamentoService.listID(this.id).subscribe((data:Departamento):void => {
        console.log(data);
        this.departamentoForm.patchValue({
          nombreDepartamento:data.nombreDepartamento
        });
      });
    }
  }
  onSubmit(): void {
    if(this.departamentoForm.valid){
      const departamento:Departamento = new Departamento();
      departamento.idDepartamento = this.id;
      departamento.nombreDepartamento = this.departamentoForm.value.nombreDepartamento;
      if(!this.edicion){
        this.departamentoService.insert(departamento).subscribe((data:Object): void => {
          this.departamentoService.list().subscribe(data => {
            this.departamentoService.setList(data);
          })
        })
      }else{
        this.departamentoService.update(departamento).subscribe((data:Object): void => {
          this.departamentoService.list().subscribe(data => {
            this.departamentoService.setList(data);
          })
        })
      }
      this.router.navigate(['/dashboard/departamentos']);
    }else{
      console.log("Formulario no valido");
      alert("Formulario no valido");
    }
  }
}
