import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
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
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogoComponent} from '../campania-listar/confirm-dialogo/confirm-dialogo.component';

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
export class DistritoListardistritoEditComponent implements OnInit, AfterViewInit{
  lista:Distrito[]=[];
  displayedColumns: string[]=['idDistrito','nombre','departamento','accion01', 'accion02'];
  dataSource:MatTableDataSource<Distrito>=new MatTableDataSource<Distrito>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  distritoService:DistritoService=inject(DistritoService);
  router:Router=inject(Router);
  dialog = inject(MatDialog)
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

  loadLista():void {
    this.distritoService.list().subscribe({
      next: (data) => this.dataSource.data=data,
      error: (error) => console.log("Error error error",error),
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogoComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.delete(id);
      }else{
        console.log("Diálogo respondió no eliminar");
      }
    });
  }

  private delete(id: number) {
    this.distritoService.delete(id).subscribe(()=>{
      this.loadLista()
    });
  }

}
