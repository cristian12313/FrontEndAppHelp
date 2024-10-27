import { Routes } from '@angular/router';
import {CampaniaListarComponent} from './componente/campania-listar/campania-listar.component';
import {DepartamentoListardepartamentoEditComponent} from './componente/departamento-listar-edit/departamento-listardepartamento-edit.component';
import {HomeComponent} from './componente/home/home.component';
import {AcercaComponent} from './componente/acerca/acerca.component';
import {DonacionListarComponent} from './componente/donacion-listar/donacion-listar.component';
import {CampaniaNuevoEditComponent} from './componente/campania-nuevo-edit/campania-nuevo-edit.component';
import {DepartamentoNuevodepartamentoEditComponent} from './componente/departamento-nuevo-edit/departamento-nuevodepartamento-edit.component';
import {DistritoNuevodistritoEditComponent} from './componente/distrito-nuevo-edit/distrito-nuevodistrito-edit.component';
import {DistritoListardistritoEditComponent} from './componente/distrito-listar-edit/distrito-listardistrito-edit.component';
import {DonacionNuevoEditComponent} from './componente/donacion-nuevo-edit/donacion-nuevo-edit.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './auth.guard';

export const routes: Routes = [
  // Ruta para redirigir a login si no está autenticado
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./authentication/login/login.component') },

  // Rutas para dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
  // Otras rutas protegidas por AuthGuard
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'campanias', component: CampaniaListarComponent, canActivate: [AuthGuard] },
  { path: 'nuevocampania', component: CampaniaNuevoEditComponent, canActivate: [AuthGuard] },
  { path: 'nuevocampania-edit/:id', component: CampaniaNuevoEditComponent, canActivate: [AuthGuard] },
  { path: 'donaciones', component: DonacionListarComponent, canActivate: [AuthGuard] },
  { path: 'nuevodonacion', component: DonacionNuevoEditComponent, canActivate: [AuthGuard] },
  { path: 'nuevodonacion-edit/:id', component: DonacionNuevoEditComponent, canActivate: [AuthGuard] },
  { path: 'acerca', component: AcercaComponent, canActivate: [AuthGuard] },
  { path: 'departamentos', component: DepartamentoListardepartamentoEditComponent, canActivate: [AuthGuard] },
  { path: 'nuevodepartamento', component: DepartamentoNuevodepartamentoEditComponent, canActivate: [AuthGuard] },
  { path: 'nuevodepartamento-edit/:id', component: DepartamentoNuevodepartamentoEditComponent, canActivate: [AuthGuard] },
  { path: 'distritos', component: DistritoListardistritoEditComponent, canActivate: [AuthGuard] },
  { path: 'nuevodistrito', component: DistritoNuevodistritoEditComponent, canActivate: [AuthGuard] },
  { path: 'nuevodistrito-edit/:id', component: DistritoNuevodistritoEditComponent, canActivate: [AuthGuard] },
    ]
  },

  // Ruta comodín para redireccionar al dashboard si la ruta no existe
  { path: '**', redirectTo: 'dashboard' }
];
