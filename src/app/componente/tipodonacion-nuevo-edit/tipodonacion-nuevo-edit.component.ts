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
import {TipodonacionService} from '../../services/tipodonacion.service';
import {Tipodonacion} from '../../model/tipodonacion';

@Component({
  selector: 'app-tipodonacion-nuevo-edit',
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
  templateUrl: './tipodonacion-nuevo-edit.component.html',
  styleUrl: './tipodonacion-nuevo-edit.component.css'
})
export class TipodonacionNuevoEditComponent implements OnInit{
  tipodonacionForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  tipodonacionService: TipodonacionService = inject(TipodonacionService);
  router: Router = inject(Router);
  id: number =0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    console.log("Carga constructor de Form")
    this.tipodonacionForm = this.fb.group({
      idTipodonacion: [''],
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
      this.tipodonacionService.listID(this.id).subscribe((data:Tipodonacion):void => {
        console.log(data);
        this.tipodonacionForm.patchValue({
          nombre:data.nombre
        });
      });
    }
  }
  onSubmit(): void {
    if(this.tipodonacionForm.valid){
      const tipodonacion:Tipodonacion = new Tipodonacion();
      tipodonacion.idTipodonacion = this.id;
      tipodonacion.nombre = this.tipodonacionForm.value.nombre;
      if(!this.edicion){
        this.tipodonacionService.insert(tipodonacion).subscribe((data:Object): void => {
          this.tipodonacionService.list().subscribe(data => {
            this.tipodonacionService.setList(data);
          })
        })
      }else{
        this.tipodonacionService.update(tipodonacion).subscribe((data:Object): void => {
          this.tipodonacionService.list().subscribe(data => {
            this.tipodonacionService.setList(data);
          })
        })
      }
      this.router.navigate(['/dashboard/tipoDonaciones']);
    }else{
      console.log("Formulario no valido");
      alert("Formulario no valido");
    }
  }
}
