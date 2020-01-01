import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quote } from '../quotes.service';

@Component({
  selector: 'app-quote-edit-dialog',
  templateUrl: './quote-edit-dialog.component.html',
  styleUrls: ['./quote-edit-dialog.component.scss']
})
export class QuoteEditDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<QuoteEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { quote: Quote }
  ) {}

  ngOnInit() {
    console.log('data', this.data);
  }
}
