import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton,
    MatGridList,
    MatGridTile,
    NgForOf,
    NgStyle
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
