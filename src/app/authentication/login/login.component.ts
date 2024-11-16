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
    });
  }

  ngOnInit() {
    if(localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
      console.log("Token eliminado");
    }
    this.loadForm();
  }

  loadForm(): void {
    console.log("Form");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const requestDto: RequestDto = new RequestDto();
      requestDto.username = this.loginForm.value.username;
      requestDto.password = this.loginForm.value.password;

      this.loginService.login(requestDto).subscribe({
        next: (data: ResponseDto): void => {
          console.log("Login response ROLs:", data.roles);
          const userRole = data.roles[0];
          localStorage.setItem('rol', userRole);

          // Verificar el rol y redirigir en consecuencia
          if (userRole === 'ROLE_ADMIN') {
            this.router.navigate(['/admin-dashboard']); // Redirigir a la pantalla del administrador
          } else {
            this.router.navigate(['/dashboard/home']); // Redirigir a la pantalla general
          }
        },
        error: (error) => {
          console.error("Error en el login:", error);
          alert("Error en el login");
        }
      });
    } else {
      alert("Formulario no valido!");
      console.log("Formulario no valido");
    }
  }
}
// export default class LoginComponent {
//
//   username: string = '';
//   password: string = '';
//   router: Router = inject(Router);
//   loginForm: FormGroup;
//   fb = inject(FormBuilder);
//   loginService: LoginService = inject(LoginService);
//
//   constructor() {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//     })
//   }
//
//   ngOnInit() {
//     if(localStorage.getItem('token')!=null){
//       localStorage.removeItem('token');
//       console.log("Token eliminado");
//     }
//     this.loadForm()
//   }
//
//   loadForm(): void {
//     console.log("Form");
//   }
//
//   onSubmit() {
//     if (this.loginForm.valid) {
//       const requestDto: RequestDto = new RequestDto()
//       requestDto.username = this.loginForm.value.username;
//       requestDto.password = this.loginForm.value.password;
//       let responseDTO: ResponseDto = new ResponseDto();
//       this.loginService.login(requestDto).subscribe({
//         next: (data: ResponseDto): void => {
//           console.log("Login response ROLs:", data.roles);
//           console.log("Login response ROL:", data.roles[0]);
//           localStorage.setItem('rol', data.roles[0]);
//         }
//       })
//       alert("Login ok!")
//       this.router.navigate(['/dashboard/home'])
//     } else {
//       alert("Formulario no valido!")
//       console.log("Formulario no valido");
//     }
//   }
// }
