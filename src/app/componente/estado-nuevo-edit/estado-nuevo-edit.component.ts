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
import {EstadoService} from '../../services/estado.service';
import {Estado} from '../../model/estados';

@Component({
  selector: 'app-estado-nuevo-edit',
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
  templateUrl: './estado-nuevo-edit.component.html',
  styleUrl: './estado-nuevo-edit.component.css'
})
export class EstadoNuevoEditComponent implements OnInit{
  estadoForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  estadoService: EstadoService = inject(EstadoService);
  router: Router = inject(Router);
  id: number =0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    console.log("Carga constructor de Form")
    this.estadoForm = this.fb.group({
      idEstado: [''],
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
      this.estadoService.listID(this.id).subscribe((data:Estado):void => {
        console.log(data);
        this.estadoForm.patchValue({
          nombre:data.nombre
        });
      });
    }
  }
  onSubmit(): void {
    if(this.estadoForm.valid){
      const estado:Estado = new Estado();
      estado.idEstado = this.id;
      estado.nombre = this.estadoForm.value.nombre;
      if(!this.edicion){
        this.estadoService.insert(estado).subscribe((data:Object): void => {
          this.estadoService.list().subscribe(data => {
            this.estadoService.setList(data);
          })
        })
      }else{
        this.estadoService.update(estado).subscribe((data:Object): void => {
          this.estadoService.list().subscribe(data => {
            this.estadoService.setList(data);
          })
        })
      }
      this.router.navigate(['/dashboard/estados']);
    }else{
      console.log("Formulario no valido");
      alert("Formulario no valido");
    }
  }
}
