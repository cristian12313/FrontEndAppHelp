import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatMenuTrigger, MatMenu],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEndAppHelp';
}
