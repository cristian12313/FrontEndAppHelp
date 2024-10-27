import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento
    this.router.navigate(['login']); // Redirige al login
  }
}
