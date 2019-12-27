import { Component, OnInit } from '@angular/core';
import { QuotesService, Quote } from './quotes.service';
import { MatDialog } from '@angular/material/dialog';
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
    const addQuoteDialogRef = this.dialog.open(AddQuoteDialogComponent, {
      width: '250px',
      data: {
        text: '',
        children: {
          ben: true,
          tom: false
        }
      }
    });

    addQuoteDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.quotesService.add(result);
    });
  }
}
