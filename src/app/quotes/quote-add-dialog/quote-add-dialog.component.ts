import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuotesService, Quote } from '../quotes.service';

@Component({
  selector: 'app-quote-add-dialog',
  templateUrl: './quote-add-dialog.component.html',
  styleUrls: ['./quote-add-dialog.component.scss']
})
export class QuoteAddDialogComponent implements OnInit {
  newQuote: Quote;
  constructor(
    public dialogRef: MatDialogRef<QuoteAddDialogComponent>,
    private _quoteService: QuotesService,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {}

  ngOnInit() {
    this.newQuote = {
      text: 'new',
      children: {
        ben: true,
        tom: false
      },
      datestamp: new Date()
    };
  }

  onQuoteFormSubmit(quote: Quote) {
    // TODO: only if quote has changed
    this._quoteService.add(quote);
    this.dialogRef.close();
  }
}
