import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quote } from './../quotes.service';

@Component({
  selector: 'app-add-quote-dialog',
  templateUrl: './add-quote-dialog.component.html',
  styleUrls: ['./add-quote-dialog.component.scss']
})
export class AddQuoteDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddQuoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Quote) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
