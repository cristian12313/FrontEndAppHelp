import {Component, inject, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {Router, RouterLink} from '@angular/router';
import {Departamento} from '../../model/departamento';
import {DepartamentoService} from '../../services/departamento.service';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogoComponent} from '../campania-listar/confirm-dialogo/confirm-dialogo.component';

@Component({
  selector: 'app-departamento-listar-edit',
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
  templateUrl: './departamento-listardepartamento-edit.component.html',
  styleUrl: './departamento-listardepartamento-edit.component.css'
})
export class DepartamentoListardepartamentoEditComponent {
  lista:Departamento[]=[];
  displayedColumns: string[]=['idDepartamento','nombreDepartamento','accion01', 'accion02'];
  dataSource:MatTableDataSource<Departamento>=new MatTableDataSource<Departamento>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  departamentoService:DepartamentoService=inject(DepartamentoService);
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
    // Suscribirse al observable de la lista de proveedores
    this.departamentoService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadLista();
  }

  loadLista(): void {
    this.departamentoService.list().subscribe({
      next: (data) => {
        this.departamentoService.setList(data); //enviar la nueva lista a los suscriptores
      },
      error: (err) => console.error("Error en consulta", err)
    })
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
    this.departamentoService.delete(id).subscribe(() => {
      this.departamentoService.list().subscribe(data => {
        this.departamentoService.setList(data);//enviar la nueva lista a los suscriptores
    });
    });
  }
}
