import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { SnackbarService } from './snackbar.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, UserService } from './user.service';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  public user: User;

  private _authState: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private _snackbarService: SnackbarService,
    private db: AngularFirestore,
    private userService: UserService,
    private navigationService: NavigationService
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
            console.log('user', user);
            console.log('authUser', authUser);
            if (!user) {
              this._snackbarService.open('Het aanmaken van je account is niet helemaal goed gegaan.');
            } else {
              this.user = user;
            }
          });

          this.navigationService.toQuotesIfOnIntro();
        } else {
          if (isPreviousUser) {
            this._snackbarService.open('Je bent uitgelogd');
          }
          this.user = null;
          this.user$ = null;
          this.navigationService.toIntro();
        }
      },
      err => {
        this._snackbarService.open('Login mislukt.');
      }
    );
  }

  isLoggedIn(): boolean {
    return !this.isLoggedOut();
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
