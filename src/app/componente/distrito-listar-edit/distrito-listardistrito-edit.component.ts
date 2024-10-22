import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {Router, RouterLink} from '@angular/router';
import {Distrito} from '../../model/distrito';
import {DistritoService} from '../../services/distrito.service';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-distrito-listar-edit',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatSort,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    RouterLink,
    MatRowDef,
    MatHeaderRowDef,
    MatSortHeader,
    DatePipe
  ],
  templateUrl: './distrito-listardistrito-edit.component.html',
  styleUrl: './distrito-listardistrito-edit.component.css'
})
export class DistritoListardistritoEditComponent {
  lista:Distrito[]=[];
  displayedColumns: string[]=['idDistrito','nombre','accion01'];
  dataSource:MatTableDataSource<Distrito>=new MatTableDataSource<Distrito>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  distritoService:DistritoService=inject(DistritoService);
  router:Router=inject(Router);
  constructor()  {
    console.log("Load constructor!")
  }
  ngAfterViewInit():void{
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
  ngOnInit():void{
    console.log("Loaf Lista!");
    this.loadLista();
  }

  private loadLista():void {
    this.distritoService.list().subscribe({
      next: (data) => this.dataSource.data=data,
      error: (error) => console.log("Error error error",error),
    });
  }

}
