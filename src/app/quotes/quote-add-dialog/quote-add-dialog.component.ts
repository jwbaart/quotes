import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuotesService, Quote } from '../quotes.service';
import { AuthService, User } from '@app/core';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-quote-add-dialog',
  templateUrl: './quote-add-dialog.component.html',
  styleUrls: ['./quote-add-dialog.component.scss']
})
export class QuoteAddDialogComponent implements OnInit, OnDestroy {
  newQuote: Quote = null;
  private destroy$: Subject<void> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<QuoteAddDialogComponent>,
    private _quoteService: QuotesService,
    private _authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {}

  ngOnInit() {
    this._authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user: User) => {
      if (user) {
        this.newQuote = {
          text: '',
          children: {
            ben: false,
            tom: false
          },
          datestamp: new Date(),
          uid: user.uid
        };
      }
    });
  }

  onQuoteFormSubmit(quote: Quote) {
    // TODO: only if quote has changed
    this._quoteService.add(quote);
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
