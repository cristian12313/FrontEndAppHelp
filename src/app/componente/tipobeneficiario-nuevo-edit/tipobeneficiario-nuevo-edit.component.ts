import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TipobeneficiarioService} from '../../services/tipobeneficiario.service';
import {Tipobeneficiario} from '../../model/tipobeneficiario';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-tipobeneficiario-nuevo-edit',
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
  templateUrl: './tipobeneficiario-nuevo-edit.component.html',
  styleUrl: './tipobeneficiario-nuevo-edit.component.css'
})
export class TipobeneficiarioNuevoEditComponent implements OnInit{
  tipobeneficiarioForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  tipobeneficiarioService: TipobeneficiarioService = inject(TipobeneficiarioService);
  router: Router = inject(Router);
  id: number =0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    console.log("Carga constructor de Form")
    this.tipobeneficiarioForm = this.fb.group({
      idTipobene: [''],
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
      this.tipobeneficiarioService.listID(this.id).subscribe((data:Tipobeneficiario):void => {
        console.log(data);
        this.tipobeneficiarioForm.patchValue({
          nombre:data.nombre
        });
      });
    }
  }
  onSubmit(): void {
    if(this.tipobeneficiarioForm.valid){
      const tipobeneficiario:Tipobeneficiario = new Tipobeneficiario();
      tipobeneficiario.idTipobene = this.id;
      tipobeneficiario.nombre = this.tipobeneficiarioForm.value.nombre;
      if(!this.edicion){
        this.tipobeneficiarioService.insert(tipobeneficiario).subscribe((data:Object): void => {
          this.tipobeneficiarioService.list().subscribe(data => {
            this.tipobeneficiarioService.setList(data);
          })
        })
      }else{
        this.tipobeneficiarioService.update(tipobeneficiario).subscribe((data:Object): void => {
          this.tipobeneficiarioService.list().subscribe(data => {
            this.tipobeneficiarioService.setList(data);
          })
        })
      }
      this.router.navigate(['/dashboard/tipobeneficiarios']);
    }else{
      console.log("Formulario no valido");
      alert("Formulario no valido");
    }
  }
}
