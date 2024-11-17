import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Campania} from '../../model/campania';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {CampaniaService} from '../../services/campania.service';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';
import {ConfirmDialogoComponent} from './confirm-dialogo/confirm-dialogo.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-campania-listar',
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
  templateUrl: './campania-listar.component.html',
  styleUrl: './campania-listar.component.css'
})
export class CampaniaListarComponent implements OnInit, AfterViewInit{
  lista:Campania[]=[];
  displayedColumns: string[]=['idCampania','culminado','descripcion','nombre','ubicacion','cuentabancaria','tipobeneficiario','tipodonacion','accion01', 'accion02'];
  dataSource:MatTableDataSource<Campania>=new MatTableDataSource<Campania>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  campaniaService:CampaniaService=inject(CampaniaService);
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
    this.campaniaService.list().subscribe({
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
    this.campaniaService.delete(id).subscribe(()=>{
      this.loadLista()
    });
  }
}
