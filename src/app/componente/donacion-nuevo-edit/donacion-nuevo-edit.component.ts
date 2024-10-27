import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DonacionService} from '../../services/donacion.service';
import {Donacion} from '../../model/donacion';
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
import {Campania} from '../../model/campania';
import {CampaniaService} from '../../services/campania.service';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-donacion-nuevo-edit',
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
    NgForOf,
    MatSelectModule
  ],
  templateUrl: './donacion-nuevo-edit.component.html',
  styleUrl: './donacion-nuevo-edit.component.css'
})
export class DonacionNuevoEditComponent implements OnInit{
  donacionForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  donacionService: DonacionService = inject(DonacionService);
  router: Router = inject(Router);
  id: number =0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);

  //
  campaniaService: CampaniaService = inject(CampaniaService);
  public idCampaniaSeleccionado: number = 0;
  lista: Campania[] = [];
  campania: Campania = new Campania();

  constructor() {
    console.log("Carga constructor de Form")
    this.donacionForm = this.fb.group({
      idDonacion: [''],
      ubicacion: ['', Validators.required],
      monto: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      //
      campania: ['', [Validators.required]],
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
    //
    this.loadLista();
  }
  loadLista(): void {
    this.campaniaService.list().subscribe({
      next: (data) => this.lista = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }
  private cargarForm() {
    if(this.edicion){
      this.donacionService.listID(this.id).subscribe((data:Donacion):void => {
        console.log(data);
        this.donacionForm.patchValue({
          ubicacion:data.ubicacion,
          monto:data.monto,
          fechaInicio:data.fechaInicio,
          fechaFin:data.fechaFin,
          detalle:data.detalle,
          campania:data.campania
        });
      });
    }
  }

  onSubmit(): void {
    if(this.donacionForm.valid){
      const donacion:Donacion = new Donacion();
      donacion.idDonacion = this.id;
      donacion.ubicacion = this.donacionForm.value.ubicacion;
      donacion.monto = this.donacionForm.value.monto;
      donacion.fechaInicio = this.donacionForm.value.fechaInicio;
      donacion.fechaFin = this.donacionForm.value.fechaFin;
      donacion.detalle = this.donacionForm.value.detalle;
      //
      donacion.campania = this.campania;
      donacion.campania.idCampania = this.donacionForm.value.campania;
      if(!this.edicion){
        this.donacionService.insert(donacion).subscribe((data:Object): void => {
          this.donacionService.list().subscribe(data => {
            this.donacionService.setList(data);
          })
        })
      }else{
        this.donacionService.update(donacion).subscribe((data:Object): void => {
          this.donacionService.list().subscribe(data => {
            this.donacionService.setList(data);
          })
        })
      }
      this.router.navigate(['/dashboard/donaciones']);
    }else{
      console.log("Formulario no valido");
      alert("Formulario no valido");
    }
  }
}
