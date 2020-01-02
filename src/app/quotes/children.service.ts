import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SnackbarService } from '@app/core/services/snackbar.service';

export enum ChildId {
  Ben = 'ben',
  Tom = 'tom'
}

export interface Child {
  id: ChildId;
  firstName: string;
  name: string;
  dateOfBirth: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {
  private _childrenCollection: AngularFirestoreCollection<Child>;

  children: Observable<Child[]>;

  constructor(private db: AngularFirestore, private snackbarService: SnackbarService) {
    this._childrenCollection = db.collection('children');

    this.children = this._childrenCollection.valueChanges();
  }
}
