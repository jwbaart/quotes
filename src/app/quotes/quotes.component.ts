import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotesService, Quote } from './quotes.service';
import { ChildrenService, Child } from './children.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuoteEditDialogComponent } from './quote-edit-dialog/quote-edit-dialog.component';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { QuoteAddDialogComponent } from './quote-add-dialog/quote-add-dialog.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit, OnDestroy {
  quotes: Quote[] = [];
  isQuotesLoading = true;
  private _ngUnsubscribeQuotes: Subject<void> = new Subject();

  children: Child[] = [];
  isChildrenLoading = true;

  constructor(
    public quotesService: QuotesService,
    public dialog: MatDialog,
    private _snackBar: SnackbarService,
    private _childrenService: ChildrenService
  ) {}

  ngOnInit() {
    this.quotesService.quotes.pipe(takeUntil(this._ngUnsubscribeQuotes)).subscribe(
      quotes => {
        this.quotes = quotes;
        this.isQuotesLoading = false;
      },
      error => {
        console.log(error);
        this._snackBar.open('Je account is nog niet geactiveerd: ');
        this.isQuotesLoading = false;
      }
    );

    this._childrenService.children.pipe(takeUntil(this._ngUnsubscribeQuotes)).subscribe(
      children => {
        this.children = children;
        this.isChildrenLoading = false;
      },
      () => {
        this._snackBar.open('Je account is nog niet geactiveerd');
        this.isChildrenLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this._ngUnsubscribeQuotes.next();
    this._ngUnsubscribeQuotes.complete();
  }

  onAddQuoteButtonClick() {
    const quoteAddDialogConfig = new MatDialogConfig();
    quoteAddDialogConfig.width = '80vw';
    this.dialog.open(QuoteAddDialogComponent, quoteAddDialogConfig);
  }

  onEditQuote(quote: Quote) {
    const quoteEditDialogConfig = new MatDialogConfig();
    quoteEditDialogConfig.data = { quote };
    quoteEditDialogConfig.width = '80vw';
    this.dialog.open(QuoteEditDialogComponent, quoteEditDialogConfig);
  }

  onDeleteQuote(quote: Quote) {
    this.quotesService.delete(quote);
  }
}
