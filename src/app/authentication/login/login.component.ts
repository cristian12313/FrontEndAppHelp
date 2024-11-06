import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LoginService} from '../../services/login.service';
import {RequestDto} from '../../model/request-dto';
import {ResponseDto} from '../../model/response-dto';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardFooter, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatButton, MatCard, MatCardContent, MatCardTitle, MatFormField, MatInput, MatLabel, MatOption, MatSelect, ReactiveFormsModule, MatCardFooter
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  // username: string = '';
  // password: string = '';
  //
  // constructor(private router: Router) {}
  //
  // login(): void {
  //   // Simula el inicio de sesión estableciendo un token en localStorage
  //   if (this.username && this.password) {  // Puedes agregar una validación más compleja aquí
  //     localStorage.setItem('token', 'userToken'); // Guarda un token en el localStorage
  //     this.router.navigate(['/dashboard']); // Redirige al Dashboard después del login
  //   } else {
  //     alert('Por favor ingresa un usuario y una contraseña válidos');
  //   }
  // }
  username: string = '';
  password: string = '';
  router: Router = inject(Router);
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      localStorage.removeItem('token');
      console.log("Token eliminado");
    }
    this.loadForm()
  }

  loadForm(): void {
    console.log("Form");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const requestDto: RequestDto = new RequestDto()
      requestDto.username = this.loginForm.value.username;
      requestDto.password = this.loginForm.value.password;
      let responseDTO: ResponseDto = new ResponseDto();
      this.loginService.login(requestDto).subscribe({
        next: (data: ResponseDto): void => {
          console.log("Login response ROLs:", data.roles);
          console.log("Login response ROL:", data.roles[0]);
          localStorage.setItem('rol', data.roles[0]);
        }
      })
      alert("Login ok!")
      this.router.navigate(['/dashboard/home'])
    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }
  }
}
