import { Injectable } from '@angular/core';
import { Quote, QuotesService } from './quotes.service';
import { Author } from './quote-card/quote-card.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';
import { Quote } from '@angular/compiler';
import { UserService } from '@app/core';

export interface EnrichedQuote {
  quote: Quote;
  author: Author;
}

@Injectable({
  providedIn: 'root'
})
export class EnrichedQuotesService {
  private _enrichedQuotes$: BehaviorSubject<EnrichedQuote[]> = new BehaviorSubject([]);
  public readonly enrichedQuotes$: Observable<EnrichedQuote[]> = this._enrichedQuotes$.asObservable();

  constructor(private readonly quotesService: QuotesService,private readonly userService: UserService) {
    this.initEnrichedQuotes();
  }

  initEnrichedQuotes() {
    this.quotesService.quotes
      .pipe(
        map((quotes: Quote[]) =>
          quotes.map(quote => {
            
            return { quote, author: {} as Author };
          })
        )
        //     console.log('exhaustMap - quote', quotes);
        //     return quotes.map(quote => ({ quote, author: {} as Author }));
        //   })
      )
      .subscribe(enrichedQuotes => this._enrichedQuotes$.next(enrichedQuotes));
  }
}
