import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-authenticated-user-dialog',
  templateUrl: './edit-authenticated-user-dialog.component.html',
  styleUrls: ['./edit-authenticated-user-dialog.component.scss']
})
export class EditAuthenticatedUserDialogComponent implements OnInit, OnDestroy {
  authenticatedUserForm: FormGroup;
  destroy$: Subject<null> = new Subject();

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.authenticatedUserForm = this.formBuilder.group({
      name: [null, Validators.required],
      role: [null, Validators.required],
      photo: [null, Validators.required]
    });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  submit() {
    console.log('submit');
  }
}
