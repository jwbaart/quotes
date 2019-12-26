import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quote } from './../quote';

@Component({
  selector: 'app-add-quote-dialog',
  templateUrl: './add-quote-dialog.component.html',
  styleUrls: ['./add-quote-dialog.component.scss']
})
export class AddQuoteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddQuoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Quote) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
