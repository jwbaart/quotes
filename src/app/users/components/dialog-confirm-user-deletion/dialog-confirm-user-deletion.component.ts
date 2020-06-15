import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@app/core';

export interface DialogConfirmUserDeletionData {
  user: User;
}

@Component({
  selector: 'app-dialog-confirm-user-deletion',
  templateUrl: './dialog-confirm-user-deletion.component.html',
  styleUrls: ['./dialog-confirm-user-deletion.component.scss']
})
export class DialogConfirmUserDeletionComponent implements OnInit {
  user: User;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmUserDeletionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmUserDeletionData
  ) {}

  ngOnInit(): void {
    this.user = this.data.user;
  }

  close(result) {
    this.dialogRef.close(result);
  }
}
