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
import {Estado} from '../../model/estados';
import {EstadoService} from '../../services/estado.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogoComponent} from '../campania-listar/confirm-dialogo/confirm-dialogo.component';

@Component({
  selector: 'app-estado-listar',
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
  templateUrl: './estado-listar.component.html',
  styleUrl: './estado-listar.component.css'
})
export class EstadoListarComponent {
  lista:Estado[]=[];
  displayedColumns: string[]=['idEstado','nombre','accion01', 'accion02'];
  dataSource:MatTableDataSource<Estado>=new MatTableDataSource<Estado>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  estadoService:EstadoService=inject(EstadoService);
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

  private loadLista():void {
    this.estadoService.list().subscribe({
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

  delete(id: number) {
    this.estadoService.delete(id).subscribe(()=>{
      this.loadLista()
    });
  }
}
