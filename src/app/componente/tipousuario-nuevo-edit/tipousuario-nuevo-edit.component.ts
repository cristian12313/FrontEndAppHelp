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
import {CampaniaService} from '../../services/campania.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Campania} from '../../model/campania';
import {TipousuarioService} from '../../services/tipousuario.service';
import {Tipousuario} from '../../model/tipousuario';

@Component({
  selector: 'app-tipousuario-nuevo-edit',
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
  templateUrl: './tipousuario-nuevo-edit.component.html',
  styleUrl: './tipousuario-nuevo-edit.component.css'
})
export class TipousuarioNuevoEditComponent implements OnInit{
  tipousuarioForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  tipousuarioService: TipousuarioService = inject(TipousuarioService);
  router: Router = inject(Router);
  id: number =0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    console.log("Carga constructor de Form")
    this.tipousuarioForm = this.fb.group({
      idTipousuario: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
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
      this.tipousuarioService.listID(this.id).subscribe((data:Tipousuario):void => {
        console.log(data);
        this.tipousuarioForm.patchValue({
          nombre:data.nombre,
          descripcion:data.descripcion
        });
      });
    }
  }
  onSubmit(): void {
    if(this.tipousuarioForm.valid){
      const tipousuario:Tipousuario = new Tipousuario();
      tipousuario.idTipousuario = this.id;
      tipousuario.nombre = this.tipousuarioForm.value.culminado;
      tipousuario.descripcion = this.tipousuarioForm.value.descripcion;
      if(!this.edicion){
        this.tipousuarioService.insert(tipousuario).subscribe((data:Object): void => {
          this.tipousuarioService.list().subscribe(data => {
            this.tipousuarioService.setList(data);
          })
        })
      }else{
        this.tipousuarioService.update(tipousuario).subscribe((data:Object): void => {
          this.tipousuarioService.list().subscribe(data => {
            this.tipousuarioService.setList(data);
          })
        })
      }
      this.router.navigate(['/dashboard/tipousuarios']);
    }else{
      console.log("Formulario no valido");
      alert("Formulario no valido");
    }
  }
}
