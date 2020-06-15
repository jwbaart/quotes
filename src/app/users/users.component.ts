import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService, RolesService } from '@app/core';
import { UpdateRoleEvent, DeleteUserEvent } from './components/overview/overview.component';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { AdminService } from '@app/core/services/admin/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmUserDeletionComponent } from './components/dialog-confirm-user-deletion/dialog-confirm-user-deletion.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', './../core/page.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  updateRole(roleUpdate: UpdateRoleEvent) {
    this.adminService.setRole(roleUpdate.uid, roleUpdate.role).subscribe(
      () => this.snackbarService.open('Het zetten van de rol is gelukt.'),
      () => this.snackbarService.open('Het zetten van de rol is mislukt.')
    );
  }

  deleteUser(deleteUser: DeleteUserEvent) {
    const user = deleteUser.user;
    const dialogRef = this.dialog.open(DialogConfirmUserDeletionComponent, { data: { user } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._deleteUser(user.uid);
      }
    });
  }

  _deleteUser(uid) {
    this.adminService.deleteUser(uid).subscribe(
      () => this.snackbarService.open('Het verwijderen van de gebruiker is gelukt.'),
      () => this.snackbarService.open('Het verwijderen van de gebruiker is mislukt.')
    );
  }
}
