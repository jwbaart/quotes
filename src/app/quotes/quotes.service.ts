import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export enum Child {
  Ben = 'ben',
  Tom = 'tom'
}
export interface Quote {
  id: string;
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
  quotes: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this._quotesCollection = db.collection('quotes');

    this.quotes = db
      .collection('quotes')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const quote = a.payload.doc.data() as Quote;
            const id = a.payload.doc.id;
            return { id, ...quote };
          });
        })
      );
  }

  add(content) {
    this._quotesCollection.add(content);
  }
}
