import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
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

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private _quotesCollection: AngularFirestoreCollection<Quote>;

  quotes: Observable<Quote[]>;

  constructor(private db: AngularFirestore, private snackbarService: SnackbarService) {
    this._quotesCollection = db.collection('quotes', ref => ref.orderBy('datestamp', 'desc'));

    this.quotes = this._quotesCollection.snapshotChanges().pipe(
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
