import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotesService, Quote } from './quotes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddQuoteDialogComponent } from './add-quote-dialog/add-quote-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit, OnDestroy {
  quotes: Quote[] = [];
  isQuotesLoading = true;
  private _ngUnsubscribe: Subject<void> = new Subject();

  constructor(public quotesService: QuotesService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.quotesService.quotes.pipe(takeUntil(this._ngUnsubscribe)).subscribe(
      quotes => {
        this.quotes = quotes;
        this.isQuotesLoading = false;
      },
      () => {
        this._snackBar.open('Je account is nog niet geactiveerd', '', { duration: 3000 });
        this.isQuotesLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
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

  onEditQuote() {
    console.log('onEditQuote');
  }
}
