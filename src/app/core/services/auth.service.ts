import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: firebase.User = null;
  private _authState: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private _snackbarService: SnackbarService) {
    console.log('this.afAuth', this.afAuth);
    this._authState = this.afAuth.authState;

    this._authState.subscribe(
      user => {
        console.log('user', user);
        if (user) {
          this.currentUser = user;
        } else {
          this.currentUser = null;
        }
      },
      err => {
        // this.openSnackBar(`${err.status} ${err.statusText} (${err.error.message})`, 'Please try again')
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
      .then(response => {
        this.router.navigate(['quotes']);
        this._snackbarService.open('Je bent ingelogd');
      })
      .catch(error => this._snackbarService.open('Fout tijdens het inloggen: ' + error));
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(response => {
        this.router.navigate(['home']);
        this._snackbarService.open('Je bent uitgelogd');
      })
      .catch(error => this._snackbarService.open('Fout tijdens het uitloggen: ' + error));
  }
}
