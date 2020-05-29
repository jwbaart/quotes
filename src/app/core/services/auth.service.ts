import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { auth } from 'firebase/app';
import { SnackbarService } from './snackbar.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, UserService } from './user/user.service';
import { NavigationService } from './navigation.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  public user: User;

  private _isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isAdmin$: Observable<boolean> = this._isAdmin$.asObservable();

  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  private _authState: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private _snackbarService: SnackbarService,
    private db: AngularFirestore,
    private userService: UserService,
    private navigationService: NavigationService
  ) {
    this._authState = this.afAuth.authState;

    this.initIsAdmin();
    this.initIsLoggedIn();

    this._authState.subscribe(
      authenticatedUser => {
        const isPreviousUser = !!this.user;

        if (authenticatedUser) {
          if (!isPreviousUser) {
            this._snackbarService.open('Je bent ingelogd');
          }

          const userDoc = this.db.doc<User>(`users/${authenticatedUser.uid}`);
          this.user$ = userDoc.valueChanges();
          this.userService.get(authenticatedUser.uid).subscribe(user => {
            console.log(user);
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

  initIsAdmin() {
    this.afAuth.idTokenResult
      .pipe(
        map(
          idTokenResult => idTokenResult && idTokenResult.claims.hasOwnProperty('admin') && idTokenResult.claims.admin
        )
      )
      .subscribe(isAdmin => this._isAdmin$.next(isAdmin));
  }

  initIsLoggedIn() {
    this._authState
      .pipe(map(authenticatedUser => authenticatedUser !== null))
      .subscribe(isLoggedIn => this._isLoggedIn$.next(isLoggedIn));
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
