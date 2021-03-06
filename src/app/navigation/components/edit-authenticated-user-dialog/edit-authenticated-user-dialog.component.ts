import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { AuthService, User } from '@app/core';
import { EditAuthenticatedUser } from '../edit-authenticated-user/edit-authenticated-user.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-authenticated-user-dialog',
  templateUrl: './edit-authenticated-user-dialog.component.html',
  styleUrls: ['./edit-authenticated-user-dialog.component.scss']
})
export class EditAuthenticatedUserDialogComponent implements OnInit, OnDestroy {
  authenticatedUserForm: FormGroup;
  destroy$: Subject<null> = new Subject();
  user$: Observable<EditAuthenticatedUser>;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService) {}

  ngOnInit(): void {
    // this.authenticatedUserForm = this.formBuilder.group({
    //   name: [null, Validators.required],
    //   role: [null, Validators.required],
    //   photo: [null, Validators.required]
    // });
    this.user$ = this.authService.user$.pipe(map(this._userToEditAuthenticatedUser));
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  submit() {
    console.log('submit');
  }

  _userToEditAuthenticatedUser(user: User): EditAuthenticatedUser {
    if (user) {
      return {
        name: user.name,
        role: user.role,
        photoUrl: user.photoURL
      };
    }
  }
}
