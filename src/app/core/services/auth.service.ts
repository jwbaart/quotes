import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, UserService } from './user.service';

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
    private db: AngularFirestore,
    private userService: UserService
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
          this.user$ = userDoc.valueChanges();
          this.userService.get(authUser.uid).subscribe(user => {
            if (!user) {
              this._snackbarService.open('Het aanmaken van je account is niet helemaal goed gegaan.');
            } else {
              this.user = user;
            }
          });

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
