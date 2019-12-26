import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

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
}
