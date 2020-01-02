import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { SnackbarService } from '@app/core/services/snackbar.service';

export enum Child {
  Ben = 'ben',
  Tom = 'tom'
}
export interface Quote {
  id?: string;
  title?: string;
  text: string;
  children: {
    [key in Child]: boolean;
  };
  datestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private _quotesCollection: AngularFirestoreCollection<any>;

  quotes: Observable<Quote[]>;

  constructor(private db: AngularFirestore, private snackbarService: SnackbarService) {
    this._quotesCollection = db.collection('quotes');

    this.quotes = db
      .collection('quotes', ref => ref.orderBy('datestamp', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const quote: Quote = a.payload.doc.data() as Quote;
            const id = a.payload.doc.id;
            return { id, ...quote };
          });
        })
      );
  }

  add(quote: Quote) {
    this._quotesCollection.add(quote);
  }

  update(quote: Quote) {
    const quoteDoc: AngularFirestoreDocument<Quote> = this._quotesCollection.doc(quote.id);

    // TODO: Use snackbar with undo button
    quoteDoc
      .update(quote)
      .then(() => this.snackbarService.open('Uitspraak bijgewerkt'))
      .catch(() => this.snackbarService.open('Uitspraak bijwerken is mislukt, probeer het opnieuw'));
  }

  delete(quote) {
    const quoteDoc: AngularFirestoreDocument<Quote> = this._quotesCollection.doc(quote.id);

    // TODO: Use snackbar with undo button
    quoteDoc
      .delete()
      .then(result => this.snackbarService.open('Uitspraak verwijdert'))
      .catch(() => this.snackbarService.open('Uitspraak verwijderen is mislukt, probeer het opnieuw'));
  }
}
