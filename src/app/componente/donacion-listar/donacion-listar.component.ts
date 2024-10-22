import {Component, inject, ViewChild} from '@angular/core';
import {Donacion} from '../../model/donacion';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {DonacionService} from '../../services/donacion.service';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-donacion-listar',
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
  templateUrl: './donacion-listar.component.html',
  styleUrl: './donacion-listar.component.css'
})
export class DonacionListarComponent {
  lista:Donacion[];
  displayedColumns: string[]=['idDonacion','ubicacion','monto','fechaInicio','fechaFin','detalle'];
  dataSource:MatTableDataSource<Donacion>=new MatTableDataSource<Donacion>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  donacionSerice: DonacionService=inject(DonacionService);
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
    this.donacionSerice.list().subscribe({
      next: (data) => this.dataSource.data=data,
      error: (error) => console.log("Error en nose",error),
    });
  }
}
