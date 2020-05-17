import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService, RolesService } from '@app/core';
import { UpdateRoleEvent } from '/components/overview';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', './../core/page.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(private userService: UserService, private rolesService: RolesService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  updateRole(roleUpdate: UpdateRoleEvent) {
    this.rolesService.set(roleUpdate.role, roleUpdate.uid);
  }
}
