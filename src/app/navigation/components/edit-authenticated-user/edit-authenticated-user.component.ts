import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, ROLE } from '@app/core';
import { takeUntil } from 'rxjs/operators';

export interface EditAuthenticatedUser {
  name: string;
  role: ROLE;
  photoUrl: string;
}
@Component({
  selector: 'app-edit-authenticated-user',
  templateUrl: './edit-authenticated-user.component.html',
  styleUrls: ['./edit-authenticated-user.component.scss']
})
export class EditAuthenticatedUserComponent implements OnInit, OnDestroy {
  @Input() user$: Observable<EditAuthenticatedUser>;

  isLoading = true;
  isNameVisible = true;
  isNameHidden = false;
  destroy$: Subject<null> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.destroy$)).subscribe(user => (this.isLoading = !user));
  }
  onNameClick() {
    this._toggleNameVisibility();
  }

  onNameEditSave() {
    this._toggleNameVisibility();
  }

  _toggleNameVisibility() {
    this.isNameVisible = !this.isNameVisible;
    this.isNameHidden = !this.isNameVisible;
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
