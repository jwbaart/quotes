import { Component, OnInit } from '@angular/core';
import { QuotesService, Quote } from './quotes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddQuoteDialogComponent } from './add-quote-dialog/add-quote-dialog.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  constructor(public quotesService: QuotesService, public dialog: MatDialog) {}

  ngOnInit() {
    this.quotesService.quotes.subscribe(quotes => console.log('quotes', quotes));
  }

  onAddQuoteButtonClick() {
    const addQuoteDialogConfig = new MatDialogConfig();
    addQuoteDialogConfig.data = {
      text: '',
      children: {
        ben: true,
        tom: false
      },
      datestamp: new Date()
    };
    const addQuoteDialogRef = this.dialog.open(AddQuoteDialogComponent, addQuoteDialogConfig);

    addQuoteDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quotesService.add(result);
      }
    });
  }
}
