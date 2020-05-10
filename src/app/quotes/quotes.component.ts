import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotesService, Quote } from './quotes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { QuoteEditDialogComponent } from './quote-edit-dialog/quote-edit-dialog.component';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { QuoteAddDialogComponent } from './quote-add-dialog/quote-add-dialog.component';
import { Author } from './quote-card/quote-card.component';
import { UserService, User } from '@app/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss', './../core/page.scss']
})
export class QuotesComponent implements OnInit, OnDestroy {
  quotes: Quote[] = [];
  isQuotesLoading = true;
  private _ngUnsubscribeQuotes: Subject<void> = new Subject();

  isChildrenLoading = true;

  constructor(
    public quotesService: QuotesService,
    public dialog: MatDialog,
    private _snackBar: SnackbarService,
    private userService: UserService
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

  getUser(uid): Observable<User> {
    console.log('getUser', uid);
    // User$ prop in quote-card-highlight renders infinite
    return this.userService.get(uid);
    // TODO: remap to author
    // .pipe(
    //   map(user => {
    //     console.log('user', user);
    //     return {
    //       name: user.name,
    //       photoUrl: user.photoURL
    //     };
    //   })
    // );
  }

  trackQuotes(i, quote: Quote) {
    return quote.datestamp;
  }
}
