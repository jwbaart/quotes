import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuoteDialogComponent } from './add-quote-dialog/add-quote-dialog.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  constructor(public quotesService: QuotesService, public dialog: MatDialog) {}
  newQuote = null;

  ngOnInit() {
    this.quotesService.quotes.subscribe(quotes => console.log('quotes', quotes));
    this.quotesService.users.subscribe(users => console.log('users', users));
  }

  onAddQuoteButtonClick() {
    const addQuoteDialogRef = this.dialog.open(AddQuoteDialogComponent, {
      width: '250px',
      data: { newQuote: this.newQuote }
    });

    addQuoteDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newQuote = result;
    });
  }
}
