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
  // public user$: Observable<User>;
  public user: User;

  private _isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isAdmin$: Observable<boolean> = this._isAdmin$.asObservable();

  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  private _isLoggedOut$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public readonly isLoggedOut$: Observable<boolean> = this._isLoggedOut$.asObservable();

  private _user$: BehaviorSubject<User> = new BehaviorSubject(null);
  public readonly user$: Observable<User> = this._user$.asObservable();

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
    this.initIsLoggedOut();

    this._authState.subscribe(
      authenticatedUser => {
        const isPreviousUser = !!this.user;

        if (authenticatedUser) {
          if (!isPreviousUser) {
            this._snackbarService.open('Je bent ingelogd');
          }

          this.initUser(authenticatedUser.uid);
          this.userService.get(authenticatedUser.uid).subscribe(user => {
            console.log(user);
            if (!user) {
              this._snackbarService.open('Het aanmaken van je account is niet helemaal goed gegaan.');
            } else {
              this.user = user;
              if (this.user && this.user.hasOwnProperty('forceRefreshToken') && this.user.forceRefreshToken) {
                this.refreshToken();
              }
            }
          });

          this.navigationService.toQuotesIfOnIntro();
        } else {
          if (isPreviousUser) {
            this._snackbarService.open('Je bent uitgelogd');
          }
          this.initUser(null);
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
        map(idTokenResult => {
          console.log('refreshed', idTokenResult);
          return idTokenResult && idTokenResult.claims.hasOwnProperty('role') && idTokenResult.claims.role === 'admin';
        })
      )
      .subscribe(isAdmin => this._isAdmin$.next(isAdmin));
  }

  initIsLoggedIn() {
    this._authState
      .pipe(map(authenticatedUser => authenticatedUser !== null))
      .subscribe(isLoggedIn => this._isLoggedIn$.next(isLoggedIn));
  }

  initIsLoggedOut() {
    this._authState
      .pipe(map(authenticatedUser => authenticatedUser === null))
      .subscribe(isLoggedOut => this._isLoggedOut$.next(isLoggedOut));
  }

  initUser(uid = null) {
    if (uid) {
      this.userService
        .get(uid)
        .pipe(map(user => user))
        .subscribe(user => this._user$.next(user));
    } else {
      this._user$.next(null);
    }
  }

  login() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .catch(error => this._snackbarService.open('Fout tijdens het inloggen: ' + error));
  }

  logout() {
    this.afAuth.auth.signOut().catch(error => this._snackbarService.open('Fout tijdens het uitloggen: ' + error));
  }

  private refreshToken() {
    return this.afAuth.auth.currentUser.getIdTokenResult(true).finally(() => {
      // TODO: reset forceRefreshToken trigger to false
    });
  }
}
