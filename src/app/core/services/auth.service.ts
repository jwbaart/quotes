import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: firebase.User = null;
  private _authState: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private _snackbarService: SnackbarService) {
    this._authState = this.afAuth.authState;

    this._authState.subscribe(
      user => {
        const isPreviousUser = !!this.currentUser;

        if (user) {
          if (!isPreviousUser) {
            this._snackbarService.open('Je bent ingelogd');
          }
          this.currentUser = user;
          this.router.navigate(['quotes']);
        } else {
          if (isPreviousUser) {
            this._snackbarService.open('Je bent uitgelogd');
          }
          this.currentUser = null;
          this.router.navigate(['home']);
        }
      },
      err => {
        this._snackbarService.open('Login mislukt.');
      }
    );
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isLoggedOut(): boolean {
    return this.currentUser == null;
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
