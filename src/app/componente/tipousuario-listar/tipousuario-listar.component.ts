import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
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
import {Campania} from '../../model/campania';
import {CampaniaService} from '../../services/campania.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogoComponent} from '../campania-listar/confirm-dialogo/confirm-dialogo.component';
import {Tipousuario} from '../../model/tipousuario';
import {TipodonacionService} from '../../services/tipodonacion.service';
import {TipousuarioService} from '../../services/tipousuario.service';

@Component({
  selector: 'app-tipousuario-listar',
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
  templateUrl: './tipousuario-listar.component.html',
  styleUrl: './tipousuario-listar.component.css'
})
export class TipousuarioListarComponent implements OnInit, AfterViewInit{
  lista:Tipousuario[]=[];
  displayedColumns: string[]=['idTipousuario','nombre','descripcion','accion01'];
  dataSource:MatTableDataSource<Tipousuario>=new MatTableDataSource<Tipousuario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tipousuarioService:TipousuarioService=inject(TipousuarioService);
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
    this.tipousuarioService.list().subscribe({
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
    this.tipousuarioService.delete(id).subscribe(()=>{
      this.loadLista()
    });
  }
}
