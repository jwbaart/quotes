import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: firebase.User = null;
  private _authState: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    console.log('this.afAuth', this.afAuth);
    this._authState = this.afAuth.authState;

    this._authState.subscribe(
      user => {
        console.log('user', user);
        if (user) {
          this.currentUser = user;
          // this.openSnackBar('Successfully authenticated');
          console.log('AUTHSTATE USER', user);
          // this.router.navigate(['home']);
        } else {
          console.log('AUTHSTATE USER EMPTY', user);
          this.currentUser = null;
        }
      },
      err => {
        // this.openSnackBar(`${err.status} ${err.statusText} (${err.error.message})`, 'Please try again')
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
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(response => this.router.navigate(['quotes']));
  }

  logout() {
    this.afAuth.auth.signOut().then(response => this.router.navigate(['home']));
    // .catch(error => this.openSnackBar('Error signing out: ' + error));
  }
}
