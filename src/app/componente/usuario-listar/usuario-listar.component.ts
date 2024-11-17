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
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogoComponent} from '../donacion-listar/confirm-dialogo/confirm-dialogo.component';
import {Usuario} from '../../model/usuario';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-listar',
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
  templateUrl: './usuario-listar.component.html',
  styleUrl: './usuario-listar.component.css'
})
export class UsuarioListarComponent implements OnInit, AfterViewInit{
  lista:Usuario[]=[];
  displayedColumns: string[]=['idUsuario','username','password','apellidos','correo','dni', 'telefono', 'tipousuario', 'accion01', 'accion02'];
  dataSource:MatTableDataSource<Usuario>=new MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  usuarioService: UsuarioService=inject(UsuarioService);
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
    this.usuarioService.list().subscribe({
      next: (data) => this.dataSource.data=data,
      error: (error) => console.log("Error",error),
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
    this.usuarioService.delete(id).subscribe(()=>{
      this.loadLista()
    });
  }
}
