import { Component } from '@angular/core';
import {MatDivider} from '@angular/material/divider';
import {MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltip} from '@angular/material/tooltip';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-dashboard',
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
    MatMenuTrigger
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout(); // Llama a la función de logout del servicio
  }
}
