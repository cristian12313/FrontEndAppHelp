import {Component, OnInit} from '@angular/core';
import {MatDivider} from '@angular/material/divider';
import {MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltip} from '@angular/material/tooltip';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../auth.service';
import {DonacionService} from '../services/donacion.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Donacion} from '../model/donacion';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatDivider,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatIcon,
    MatIconButton,
    MatListItem,
    MatMenu,
    MatMenuItem,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    MatTooltip,
    RouterLink,
    RouterOutlet,
    MatMenuTrigger,
    NgForOf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatPaginator,
    MatButton,
    NgIf,
    DatePipe,
    MatFormField,
    MatInput,
    FormsModule,
    MatLabel
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  ecoRecaudacionData: any[] = [];
  donacionesPorCampania: any[] = [];
  donacionesPorEstado: any[] = [];
  donacionesPorIntervalo: any[] = [];
  // Variables para controlar la visibilidad de las tablas
  mostrarRecaudacionEconomica = false;
  mostrarDonacionesPorCampania = false;
  mostrarDonacionesPorEstado = false;
  mostrarDonacionesPorIntervalo = false;
  // Inyectamos ambos servicios en un único constructor
  constructor(
    private donacionService: DonacionService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getEcoRecaudacionData();
  }
  getEcoRecaudacionData(): void {
    this.donacionService.listarDonacionesEcoRecaudacionPorCampania().subscribe((data) => {
      this.ecoRecaudacionData = data;
      // Mostrar solo la tabla de Recaudación Económica
      this.mostrarRecaudacionEconomica = true;
      this.mostrarDonacionesPorCampania = false;
      this.mostrarDonacionesPorEstado = false;
      this.mostrarDonacionesPorIntervalo = false;
    });
  }

  // Método que se llama al hacer clic en el botón
  nombreCampania: string = ''; // Variable para almacenar el nombre de la campaña ingresado por el usuario
  getDonacionesPorCampania(pCampania: string): void {
    if (!pCampania.trim()) {
      alert('Por favor, ingrese un nombre de campaña válido.');
      return;
    }
    this.donacionService.getDonacionesPorCampania(pCampania).subscribe((data) => {
      this.donacionesPorCampania = data;
      // Mostrar solo la tabla de Donaciones por Campaña
      this.mostrarRecaudacionEconomica = false;
      this.mostrarDonacionesPorCampania = true;
      this.mostrarDonacionesPorEstado = false;
      this.mostrarDonacionesPorIntervalo = false;
    });
  }

  // Método que se llama al hacer clic en el botón
  nombreEstado: string = ''; // Variable para almacenar el nombre de la campaña ingresado por el usuario
  getDonacionesPorEstado(pEstado: string): void {
    if (!pEstado.trim()) {
      alert('Por favor, ingrese un nombre de campaña válido.');
      return;
    }
    this.donacionService.getDonacionesPorEstado(pEstado).subscribe((data) => {
      this.donacionesPorEstado = data;
      // Mostrar solo la tabla de Donaciones por Campaña
      this.mostrarRecaudacionEconomica = false;
      this.mostrarDonacionesPorCampania = false;
      this.mostrarDonacionesPorEstado = true;
      this.mostrarDonacionesPorIntervalo = false;
    });
  }

  // Método que se llama al hacer clic en el botón
  getDonacionesPorIntervalo(fechaInicio: string, fechaFin: string): void {
    this.donacionService.getDonacionesPorIntervalo(fechaInicio, fechaFin).subscribe((data) => {
      this.donacionesPorIntervalo = data;
      // Mostrar solo la tabla de Donaciones por Campaña
      this.mostrarRecaudacionEconomica = false;
      this.mostrarDonacionesPorCampania = false;
      this.mostrarDonacionesPorEstado = false;
      this.mostrarDonacionesPorIntervalo = true;
    });
  }

  //Método de logout
  logout(): void {
    this.authService.logout(); // Llama al servicio de logout
  }
}
