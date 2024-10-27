import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDivider} from '@angular/material/divider';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {DashboardComponent} from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatButton,
    MatMenuItem,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatToolbar,
    MatToolbarModule,
    MatIconButton,
    MatIcon,
    MatIconModule,
    MatTooltip,
    MatDivider,
    MatNavList,
    MatListItem,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    DashboardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEndAppHelp';
}
