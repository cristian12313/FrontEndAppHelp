import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('token'); // Cambia esto por tu lógica de autenticación
    if (!isAuthenticated) {
      this.router.navigate(['login']); // Redirige al login si no está autenticado
      return false;
    }
    return true;
  }
}
