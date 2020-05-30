import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService, RolesService } from '@app/core';
import { UpdateRoleEvent } from './components/overview/overview.component';
import { SnackbarService } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', './../core/page.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(
    private userService: UserService,
    private rolesService: RolesService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  updateRole(roleUpdate: UpdateRoleEvent) {
    this.rolesService.set(roleUpdate.uid, roleUpdate.role).subscribe(
      () => this.snackbarService.open('Het zetten van de rol is gelukt.'),
      () => this.snackbarService.open('Het zetten van de rol is mislukt.')
    );
  }
}
