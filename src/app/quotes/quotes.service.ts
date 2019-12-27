import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

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
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private _quotesCollection: AngularFirestoreCollection<any>;
  quotes: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this._quotesCollection = db.collection('quotes');
    this.quotes = db.collection('quotes').valueChanges();
  }

  add(content) {
    // this.db.collection('quotes').add(text);
    this._quotesCollection.add(content);
  }
}
