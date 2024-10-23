import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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

@Component({
  selector: 'app-distrito-nuevo-edit',
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
  templateUrl: './distrito-nuevodistrito-edit.component.html',
  styleUrl: './distrito-nuevodistrito-edit.component.css'
})
export class DistritoNuevodistritoEditComponent implements OnInit{
  distritoForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  distritoService: DistritoService = inject(DistritoService);
  router: Router = inject(Router);
  id: number =0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    console.log("Carga constructor de Form")
    this.distritoForm = this.fb.group({
      idDistrito: [''],
      nombre: ['', Validators.required],
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
      this.distritoService.listID(this.id).subscribe((data:Distrito):void => {
        console.log(data);
        this.distritoForm.patchValue({
          nombre:data.nombre
        });
      });
    }
  }
  onSubmit(): void {
    if(this.distritoForm.valid){
      const distrito:Distrito = new Distrito();
      distrito.idDistrito = this.id;
      distrito.nombre = this.distritoForm.value.nombreDepartamento;
      if(!this.edicion){
        this.distritoService.insert(distrito).subscribe((data:Object): void => {
          this.distritoService.list().subscribe(data => {
            this.distritoService.setList(data);
          })
        })
      }else{
        this.distritoService.update(distrito).subscribe((data:Object): void => {
          this.distritoService.list().subscribe(data => {
            this.distritoService.setList(data);
          })
        })
      }
      this.router.navigate(['distritos']);
    }else{
      console.log("Formulario no valido");
      alert("Formulario no valido");
    }
  }

}
