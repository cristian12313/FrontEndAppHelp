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
import {
  TipobeneficiarioNuevoEditComponent
} from './componente/tipobeneficiario-nuevo-edit/tipobeneficiario-nuevo-edit.component';
import {TipobeneficarioListarComponent} from './componente/tipobeneficario-listar/tipobeneficario-listar.component';
import {CuentabancariaListarComponent} from './componente/cuentabancaria-listar/cuentabancaria-listar.component';
import {EstadoListarComponent} from './componente/estado-listar/estado-listar.component';
import {EstadoNuevoEditComponent} from './componente/estado-nuevo-edit/estado-nuevo-edit.component';
import {
  CuentabancariaNuevoEditComponent
} from './componente/cuentabancaria-nuevo-edit/cuentabancaria-nuevo-edit.component';
import {TipodonacionListarComponent} from './componente/tipodonacion-listar/tipodonacion-listar.component';
import {TipodonacionNuevoEditComponent} from './componente/tipodonacion-nuevo-edit/tipodonacion-nuevo-edit.component';
import {TipousuarioListarComponent} from './componente/tipousuario-listar/tipousuario-listar.component';
import {TipousuarioNuevoEditComponent} from './componente/tipousuario-nuevo-edit/tipousuario-nuevo-edit.component';
import {UsuarioListarComponent} from './componente/usuario-listar/usuario-listar.component';
import {UsuarioNuevoEditComponent} from './componente/usuario-nuevo-edit/usuario-nuevo-edit.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  // Ruta para redirigir a login si no está autenticado
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./authentication/login/login.component') },

//// Ruta para admin que está autenticado
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},


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
      { path: 'tipobeneficiarios', component: TipobeneficarioListarComponent, canActivate: [AuthGuard] },
      { path: 'nuevotipobeneficiario', component: TipobeneficiarioNuevoEditComponent, canActivate: [AuthGuard] },
      { path: 'nuevotipobeneficiario-edit/:id', component: TipobeneficiarioNuevoEditComponent, canActivate: [AuthGuard] },
      { path: 'cuentabancarias', component: CuentabancariaListarComponent, canActivate: [AuthGuard] },
      { path: 'nuevocuentabancaria', component: CuentabancariaNuevoEditComponent, canActivate: [AuthGuard] },
      { path: 'nuevocuentabancaria-edit/:id', component: CuentabancariaNuevoEditComponent, canActivate: [AuthGuard] },
      { path: 'estados', component: EstadoListarComponent, canActivate: [AuthGuard] },
      { path: 'nuevoestado', component: EstadoNuevoEditComponent, canActivate: [AuthGuard] },
      { path: 'nuevoestado-edit/:id', component: EstadoNuevoEditComponent, canActivate: [AuthGuard] },
      { path: 'tipoDonaciones', component: TipodonacionListarComponent, canActivate: [AuthGuard] },
      { path: 'nuevotipoDonacion', component: TipodonacionNuevoEditComponent, canActivate: [AuthGuard] },
      { path: 'nuevotipoDonacion-edit/:id', component: TipodonacionNuevoEditComponent, canActivate: [AuthGuard] },
      { path: 'tipousuarios', component: TipousuarioListarComponent, canActivate: [AuthGuard] },
      { path: 'nuevotipousuario', component: TipousuarioNuevoEditComponent, canActivate: [AuthGuard] },
      { path: 'nuevotipousuario-edit/:id', component: TipousuarioNuevoEditComponent, canActivate: [AuthGuard] },
      { path: 'usuarios', component: UsuarioListarComponent, canActivate: [AuthGuard] },
      { path: 'nuevousuario', component: UsuarioNuevoEditComponent, canActivate: [AuthGuard] },
      { path: 'nuevousuario-edit/:id', component: UsuarioNuevoEditComponent, canActivate: [AuthGuard] },

    ]
  },

  // Ruta comodín para redireccionar al dashboard si la ruta no existe
  { path: '**', redirectTo: 'dashboard' }
];
