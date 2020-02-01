import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { map, take } from 'rxjs/operators';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { ChildId } from './children.service';
import { MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

export interface Quote {
  id?: string;
  title?: string;
  text: string;
  children: {
    [key in ChildId]: boolean;
  };
  datestamp: Date;
}

// TODO: createdAt property?
// TODO: updatedAt property?
// TODO: revision property?
// TODO: props addition in cloud function so can't be locally changed?
export interface QuoteFirebase {
  title?: string;
  text: string;
  children: {
    [key in ChildId]: boolean;
  };
  datestamp: firebase.firestore.Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private _quotesCollection: AngularFirestoreCollection<QuoteFirebase>;

  quotes: Observable<Quote[]>;

  constructor(private db: AngularFirestore, private snackbarService: SnackbarService) {
    this._quotesCollection = db.collection('quotes', ref => ref.orderBy('datestamp', 'desc'));

    this.quotes = this._quotesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const firebaseQuote: QuoteFirebase = a.payload.doc.data() as QuoteFirebase;
          // convert firebase Timestamp to JS date
          const datestamp = firebaseQuote.datestamp.toDate();
          const id = a.payload.doc.id;
          return { id, ...firebaseQuote, datestamp } as Quote;
        });
      })
    );
  }

  add(quote: Quote) {
    const quoteFirebase: QuoteFirebase = {
      title: quote.title || '',
      text: quote.text,
      // Convert JS date to firestore timestamp
      datestamp: firebase.firestore.Timestamp.fromDate(quote.datestamp),
      children: quote.children
    };
    this._quotesCollection.add(quoteFirebase);
  }

  update(quote: Quote) {
    const quoteDoc: AngularFirestoreDocument<Quote> = this._quotesCollection.doc(quote.id);
    let quotePrev: Quote;

    // TODO: How to chain?
    const _update = () =>
      quoteDoc
        .update(quote)
        .then(() => {
          const dialogRef: MatSnackBarRef<SimpleSnackBar> = this.snackbarService.open('Uitspraak bijgewerkt', 'Undo');
          dialogRef
            .onAction()
            .pipe(take(1))
            .subscribe(() => quoteDoc.update(quotePrev).then(() => this.snackbarService.open('Ongedaan gemaakt!')));
        })
        .catch(() => this.snackbarService.open('Uitspraak bijwerken is mislukt, probeer het opnieuw'));

    quoteDoc
      .get()
      .pipe(take(1))
      .subscribe(doc => {
        quotePrev = doc.data() as Quote;
        _update();
      });
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
