import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(): void {
    // Simula el inicio de sesión estableciendo un token en localStorage
    if (this.username && this.password) {  // Puedes agregar una validación más compleja aquí
      localStorage.setItem('token', 'userToken'); // Guarda un token en el localStorage
      this.router.navigate(['/dashboard']); // Redirige al Dashboard después del login
    } else {
      alert('Por favor ingresa un usuario y una contraseña válidos');
    }
  }

}
