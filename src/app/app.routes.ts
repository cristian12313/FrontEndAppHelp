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

export const routes: Routes = [
  {path: '', component: HomeComponent,pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path:'campanias',component:CampaniaListarComponent},
  {path:'donacion',component:DonacionListarComponent},
  {path:'acerca',component:AcercaComponent},
  {path:'departamentos',component:DepartamentoListardepartamentoEditComponent},
  { path: 'nuevodepartamento', component:DepartamentoNuevodepartamentoEditComponent},
  { path: 'nuevodepartamento-edit/:id', component: DepartamentoNuevodepartamentoEditComponent},
  {path:'distritos',component:DistritoListardistritoEditComponent},
  { path: 'nuevodistrito', component:DistritoNuevodistritoEditComponent},
  { path: 'nuevodistrito-edit/:id', component: DistritoNuevodistritoEditComponent},
  {path:'donacion',component:DonacionListarComponent},
  {path:'acerca',component:AcercaComponent},
  { path: 'nuevo', component:CampaniaNuevoEditComponent},
  { path: 'nuevo-edit/:id', component: CampaniaNuevoEditComponent},
];
