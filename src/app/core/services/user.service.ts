import { Injectable } from '@angular/core';
import { FirestoreCrudService, Entity } from './firestore-crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User extends Entity {
  name: string;
  createdAt: firebase.firestore.Timestamp;
  photoUrl: string;
  role: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private crudService: FirestoreCrudService<User>;

  constructor(private afs: AngularFirestore) {
    this.crudService = new FirestoreCrudService<User>(afs, 'users');
  }

  get(uid: string): Observable<User> {
    return this.crudService.get(uid);
  }
}
