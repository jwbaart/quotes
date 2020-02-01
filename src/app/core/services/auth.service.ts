import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { AngularFirestore } from '@angular/fire/firestore';

export interface User {
  name: string;
  createdAt: firebase.firestore.Timestamp;
  photoURL: string;
  role: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  public user: User;

  private _authState: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private _snackbarService: SnackbarService,
    private db: AngularFirestore
  ) {
    this._authState = this.afAuth.authState;

    this._authState.subscribe(
      authUser => {
        const isPreviousUser = !!this.user;

        if (authUser) {
          if (!isPreviousUser) {
            this._snackbarService.open('Je bent ingelogd');
          }

          const userDoc = this.db.doc<User>(`users/${authUser.uid}`);
          userDoc.valueChanges().subscribe(x => (this.user = x));
          this.user$ = userDoc.valueChanges();

          this.router.navigate(['quotes']);
        } else {
          if (isPreviousUser) {
            this._snackbarService.open('Je bent uitgelogd');
          }
          this.user = null;
          this.user$ = null;
          this.router.navigate(['home']);
        }
      },
      err => {
        this._snackbarService.open('Login mislukt.');
      }
    );
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  isLoggedOut(): boolean {
    return this.user == null;
  }

  login() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .catch(error => this._snackbarService.open('Fout tijdens het inloggen: ' + error));
  }

  logout() {
    this.afAuth.auth.signOut().catch(error => this._snackbarService.open('Fout tijdens het uitloggen: ' + error));
  }
}
