import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reception } from 'src/app/shared/model/reception';
import { DataService } from 'src/app/shared/service/data.service';
import { AddReceptionComponent } from './add-reception/add-reception.component';
import { DeleteReceptionComponent } from './delete-reception/delete-reception.component';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {

  receptionsArr : any[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'email', 'department', 'gender','action'];
  dataSource!: MatTableDataSource<Reception>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllReceptions();
  }

  addReception() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Register Reception',
      buttonName : 'Register'
    }

    const dialogRef = this.dialog.open(AddReceptionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addReceptionist(data);
        this.openSnackBar("Registration of Reception is successful.", "OK")
      }
    })
  }

  editReception(row : any) {
    if(row.id == null || row.name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit Reception";
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.birthdate = row.birthdate.toDate();

    const dialogRef = this.dialog.open(AddReceptionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updateReceptionist(data);
        this.openSnackBar("Reception is updated successfully.", "OK")
      }
    })
  }

  deleteReception(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete Reception',
      receptionName : row.name
    }

    const dialogRef = this.dialog.open(DeleteReceptionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.deleteReceptionist(row.id);
        this.openSnackBar("Reception deleted successfully.", "OK")
      }
    })
  }

  getAllReceptions() {
    this.dataApi.getAllReceptionists().subscribe(res => {
      this.receptionsArr = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.receptionsArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  viewReception(row : any) {
    window.open('/dashboard/reception/'+row.id,'_blank');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
