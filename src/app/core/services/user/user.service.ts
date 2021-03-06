import { Injectable } from '@angular/core';
import { FirestoreCrudService, Entity } from '../firestore-crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export enum ROLE {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
  UNKNOWN = 'unknown'
}

export interface User extends Entity {
  name: string;
  createdAt: firebase.firestore.Timestamp;
  photoURL: string;
  role: ROLE;
  uid: string;
  forceRefreshToken: boolean;
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

  getUsers(): Observable<User[]> {
    return this.crudService.list();
  }

  setUserRole(uid: string, newRole: ROLE) {}

  merge(uid: string, partialUser: Partial<User>) {
    return this.crudService.merge(uid, partialUser);
  }
}
