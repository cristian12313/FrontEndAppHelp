import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {Router, RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Cuentabancaria} from '../../model/cuentabancaria';
import {CuentabancariaService} from '../../services/cuentabancaria.service';

@Component({
  selector: 'app-cuentabancaria-listar',
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
  templateUrl: './cuentabancaria-listar.component.html',
  styleUrl: './cuentabancaria-listar.component.css'
})
export class CuentabancariaListarComponent {
  lista:Cuentabancaria[]=[];
  displayedColumns: string[]=['idCuentaBanc','nombreBanco','numneroCuenta','cci','accion01'];
  dataSource:MatTableDataSource<Cuentabancaria>=new MatTableDataSource<Cuentabancaria>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cuentabancariaService:CuentabancariaService=inject(CuentabancariaService);
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
    this.cuentabancariaService.list().subscribe({
      next: (data) => this.dataSource.data=data,
      error: (error) => console.log("Error error error",error),
    });
  }
}
