import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject, partition } from 'rxjs';
import { auth } from 'firebase/app';
import { SnackbarService } from './snackbar.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, UserService, ROLE } from './user/user.service';
import { NavigationService } from './navigation.service';
import { map, tap } from 'rxjs/operators';

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

  private _isUserEditor$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isUserEditor$: Observable<boolean> = this._isUserEditor$.asObservable();

  private _user$: BehaviorSubject<User> = new BehaviorSubject(undefined);
  public readonly user$: Observable<User> = this._user$.asObservable();

  private _authState: Observable<firebase.User>;
  private _userLoggedIn$: Observable<firebase.User>;
  private _userLoggedOut$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private _snackbarService: SnackbarService,
    private userService: UserService,
    private navigationService: NavigationService
  ) {
    this._authState = this.afAuth.authState;

    this.initIsAdmin();
    this.initIsLoggedIn();
    this.initIsLoggedOut();
    this.initIsUserEditor();

    [this._userLoggedIn$, this._userLoggedOut$] = partition(
      this.afAuth.authState,
      authenticatedUser => !!authenticatedUser
    );

    this._userLoggedIn$.pipe(tap(() => console.log('userLoggedIn$'))).subscribe(authenticatedUser => {
      this.initUser(authenticatedUser.uid);
      this.user$.subscribe(user => {
        if (user) {
          const isUnknownUser = user.role === ROLE.UNKNOWN;
          this.user = user;
          if (isUnknownUser) {
            console.log('a');
            this.navigationService.toVerification();
          } else {
            this.navigationService.toQuotesIfOnIntro();
          }
        }
      });
    });
    this._userLoggedOut$.pipe(tap(() => console.log('userLoggedIn$'))).subscribe(() => {
      this.initUser(null);
      this.navigationService.toIntro();
    });

    this._authState.subscribe(
      authenticatedUser => {
        const wasLoggedIn = !!this.user;
        const wasLoggedOut = !wasLoggedIn;

        if (authenticatedUser) {
          if (wasLoggedOut) {
            this._snackbarService.open('Je bent ingelogd');
          }
        } else {
          if (wasLoggedIn) {
            this._snackbarService.open('Je bent uitgelogd');
          }
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
          return (
            idTokenResult && idTokenResult.claims.hasOwnProperty('role') && idTokenResult.claims.role === ROLE.ADMIN
          );
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

  initIsUserEditor() {
    this.user$
      .pipe(map(user => user && (user.role === ROLE.EDITOR || user.role === ROLE.ADMIN)))
      .subscribe(isUserEditor => this._isUserEditor$.next(isUserEditor));
  }

  initUser(uid = null) {
    if (uid) {
      this.userService.get(uid).subscribe(user => {
        if (user) {
          this._user$.next(user);
          if (user.forceRefreshToken) {
            this.refreshToken(uid);
          }
        }
      });
    } else {
      this._user$.next(undefined);
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

  private refreshToken(uid) {
    return this.afAuth.auth.currentUser.getIdTokenResult(true).finally(() => {
      const forceRefreshToken = false;
      this.userService.merge(uid, { forceRefreshToken });
    });
  }
}
