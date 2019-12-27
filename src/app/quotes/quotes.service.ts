import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

export enum Child {
  Ben = 'ben',
  Tom = 'tom'
}
export interface Quote {
  id: string;
  text: string;
  children: Child;
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  quotes: Observable<any[]>;
  users: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.quotes = db.collection('quotes').valueChanges();
    this.users = db.collection('users').valueChanges();
  }

  add() {
    console.log('');
  }
}
