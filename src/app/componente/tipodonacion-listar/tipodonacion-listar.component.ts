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
import {Departamento} from '../../model/departamento';
import {DepartamentoService} from '../../services/departamento.service';
import {Tipodonacion} from '../../model/tipodonacion';
import {TipodonacionService} from '../../services/tipodonacion.service';
import {ConfirmDialogoComponent} from '../campania-listar/confirm-dialogo/confirm-dialogo.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-tipodonacion-listar',
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
  templateUrl: './tipodonacion-listar.component.html',
  styleUrl: './tipodonacion-listar.component.css'
})
export class TipodonacionListarComponent {
  lista:Tipodonacion[]=[];
  displayedColumns: string[]=['idTipodonacion','nombre','accion01', 'accion02'];
  dataSource:MatTableDataSource<Tipodonacion>=new MatTableDataSource<Tipodonacion>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tipodonacionService:TipodonacionService=inject(TipodonacionService);
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
    this.tipodonacionService.list().subscribe({
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
    this.tipodonacionService.delete(id).subscribe(()=>{
      this.loadLista()
    });
  }
}
