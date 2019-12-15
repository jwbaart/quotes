import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authState: Observable<firebase.User>;
  private _currentUser: firebase.User = null;

  constructor(private afAuth: AngularFireAuth) {
    console.log('this.afAuth', this.afAuth);
    this._authState = this.afAuth.authState;

    this._authState.subscribe(
      user => {
        console.log('user', user);
        if (user) {
          this._currentUser = user;
          // this.openSnackBar('Successfully authenticated');
          console.log('AUTHSTATE USER', user);
          // this.router.navigate(['home']);
        } else {
          console.log('AUTHSTATE USER EMPTY', user);
          this._currentUser = null;
        }
      },
      err => {
        // this.openSnackBar(`${err.status} ${err.statusText} (${err.error.message})`, 'Please try again')
      }
    );
  }

  isLoggedIn(): boolean {
    return this._currentUser !== null;
  }

  isLoggedOut(): boolean {
    return this._currentUser == null;
  }

  logout() {
    this.afAuth.auth.signOut();
    // .then(response => this.openSnackBar('Signed out'))
    // .catch(error => this.openSnackBar('Error signing out: ' + error));
  }
}
