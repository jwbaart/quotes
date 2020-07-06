import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotesService, Quote } from './quotes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuoteEditDialogComponent } from './quote-edit-dialog/quote-edit-dialog.component';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { QuoteAddDialogComponent } from './quote-add-dialog/quote-add-dialog.component';
import { UserService, User, AuthService } from '@app/core';
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss', './../core/page.scss']
})
export class QuotesComponent implements OnInit, OnDestroy {
  quotes: Quote[] = [];
  quotes$: Observable<Quote[]>;
  isQuotesLoading = true;
  private destroy$: Subject<void> = new Subject();

  isChildrenLoading = true;
  canShare = false;

  constructor(
    public quotesService: QuotesService,
    public authService: AuthService,
    public dialog: MatDialog,
    private _snackBar: SnackbarService,
    private userService: UserService,
    private shareService: NgNavigatorShareService
  ) {}

  ngOnInit() {
    this.quotes$ = this.quotesService.quotes$;
    this.quotes$.pipe(takeUntil(this.destroy$)).subscribe(
      quotes => {
        this.quotes = quotes;
        this.isQuotesLoading = false;
      },
      error => {
        this._snackBar.open('Je account is nog niet geactiveerd: ');
        this.isQuotesLoading = false;
      }
    );

    this.canShare = this.shareService.canShare();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  onShareQuote(quote: Quote) {
    const title = quote.title;
    const text = quote.text;

    this.shareService.share({
      title,
      text
    });
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
