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
import {NgForOf} from '@angular/common';
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
    MatButton
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  ecoRecaudacionData: any[] = [];

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
    });
  }

  //Método de logout
  logout(): void {
    this.authService.logout(); // Llama al servicio de logout
  }
}
