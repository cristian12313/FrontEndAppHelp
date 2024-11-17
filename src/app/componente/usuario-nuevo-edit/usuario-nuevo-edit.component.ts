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
import {NgForOf} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import {Tipousuario} from '../../model/tipousuario';
import {TipousuarioService} from '../../services/tipousuario.service';
import {Usuario} from '../../model/usuario';

@Component({
  selector: 'app-usuario-nuevo-edit',
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
  templateUrl: './usuario-nuevo-edit.component.html',
  styleUrl: './usuario-nuevo-edit.component.css'
})
export class UsuarioNuevoEditComponent implements OnInit{
  usuarioForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  usuarioService: UsuarioService = inject(UsuarioService);
  router: Router = inject(Router);
  id: number =0;
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);

  //
  tipousuarioService: TipousuarioService = inject(TipousuarioService);
  public idTipoUsuarioSeleccionado: number = 0;
  lista: Tipousuario[] = [];
  tipousuario: Tipousuario = new Tipousuario();

  constructor() {
    console.log("Carga constructor de Form")
    this.usuarioForm = this.fb.group({
      idUsuario: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      //
      tipousuario: ['', [Validators.required]],
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
    this.tipousuarioService.list().subscribe({
      next: (data) => this.lista = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }
  private cargarForm() {
    if(this.edicion){
      this.usuarioService.listID(this.id).subscribe((data:Usuario):void => {
        console.log(data);
        this.usuarioForm.patchValue({
          username:data.username,
          password:data.password,
          apellidos:data.apellidos,
          correo:data.correo,
          dni:data.dni,
          telefono:data.telefono,
          tipousuario:data.tipousuario
        });
      });
    }
  }

  onSubmit(): void {
    if(this.usuarioForm.valid){
      const usuario:Usuario = new Usuario();
      usuario.idUsuario = this.id;
      usuario.username = this.usuarioForm.value.username;
      usuario.password = this.usuarioForm.value.password;
      usuario.apellidos = this.usuarioForm.value.apellidos;
      usuario.correo = this.usuarioForm.value.correo;
      usuario.dni = this.usuarioForm.value.dni;
      usuario.telefono = this.usuarioForm.value.telefono;
      //
      usuario.tipousuario = this.tipousuario;
      usuario.tipousuario.idTipousuario = this.usuarioForm.value.tipousuario;
      if(!this.edicion){
        this.usuarioService.insert(usuario).subscribe((data:Object): void => {
          this.usuarioService.list().subscribe(data => {
            this.usuarioService.setList(data);
          })
        })
      }else{
        this.usuarioService.update(usuario).subscribe((data:Object): void => {
          this.usuarioService.list().subscribe(data => {
            this.usuarioService.setList(data);
          })
        })
      }
      this.router.navigate(['/dashboard/usuarios']);
    }else{
      console.log("Formulario no valido");
      alert("Formulario no valido");
    }
  }
}
