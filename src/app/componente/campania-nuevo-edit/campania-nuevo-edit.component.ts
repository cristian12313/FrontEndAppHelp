import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CampaniaService} from '../../services/campania.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Campania} from '../../model/campania';
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
  selector: 'app-campania-nuevo-edit',
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
  templateUrl: './campania-nuevo-edit.component.html',
  styleUrl: './campania-nuevo-edit.component.css'
})
export class CampaniaNuevoEditComponent implements OnInit{
  campaniaForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  campaniaService: CampaniaService = inject(CampaniaService);
  router: Router = inject(Router);
  id: number =0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    console.log("Carga constructor de Form")
    this.campaniaForm = this.fb.group({
      idCampania: [''],
      culminado: ['false', Validators.required],
      descripcion: ['', Validators.required],
      nombre: ['', Validators.required],
      ubicacion: ['', [Validators.required]]
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
      this.campaniaService.listID(this.id).subscribe((data:Campania):void => {
        console.log(data);
        this.campaniaForm.patchValue({
          culminado:data.culminado,
          descripcion:data.descripcion,
          nombre:data.nombre,
          ubicacion:data.ubicacion
        });
      });
    }
  }
  onSubmit(): void {
    if(this.campaniaForm.valid){
      const campania:Campania = new Campania();
      campania.idCampania = this.id;
      campania.culminado = this.campaniaForm.value.culminado;
      campania.descripcion = this.campaniaForm.value.descripcion;
      campania.nombre = this.campaniaForm.value.nombre;
      campania.ubicacion = this.campaniaForm.value.ubicacion;
      if(!this.edicion){
        this.campaniaService.insert(campania).subscribe((data:Object): void => {
          this.campaniaService.list().subscribe(data => {
            this.campaniaService.setList(data);
          })
        })
      }else{
        this.campaniaService.update(campania).subscribe((data:Object): void => {
          this.campaniaService.list().subscribe(data => {
            this.campaniaService.setList(data);
          })
        })
      }
      this.router.navigate(['/dashboard/campanias']);
    }else{
      console.log("Formulario no valido");
      alert("Formulario no valido");
    }
  }
}
