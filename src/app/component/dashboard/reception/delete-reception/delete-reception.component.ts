import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-reception',
  templateUrl: './delete-reception.component.html',
  styleUrls: ['./delete-reception.component.css']
})
export class DeleteReceptionComponent implements OnInit {
  receptionName !: string;
  title !: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteReceptionComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
      this.receptionName = data.receptionName;
      this.title = data.title;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    const deleteReception = true;
    this.dialogRef.close(deleteReception);
  }
}

