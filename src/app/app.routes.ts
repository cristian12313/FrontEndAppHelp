import { Routes } from '@angular/router';
import {CampaniaListarComponent} from './componente/campania-listar/campania-listar.component';
import {HomeComponent} from './componente/home/home.component';
import {AcercaComponent} from './componente/acerca/acerca.component';
import {DonacionListarComponent} from './componente/donacion-listar/donacion-listar.component';
import {CampaniaNuevoEditComponent} from './componente/campania-nuevo-edit/campania-nuevo-edit.component';

export const routes: Routes = [
  {path: '', component: HomeComponent,pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path:'campanias',component:CampaniaListarComponent},
  {path:'donacion',component:DonacionListarComponent},
  {path:'acerca',component:AcercaComponent},
  { path: 'nuevo', component:CampaniaNuevoEditComponent},
  { path: 'nuevo-edit/:id', component: CampaniaNuevoEditComponent},
];
