import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '@app/core';
import { Observable } from 'rxjs';
import { ROLE } from '@app/core/services/user/user.service';

export interface UpdateRoleEvent {
  role: ROLE;
  uid: string;
}
export interface DeleteUserEvent {
  user: User;
}

@Component({
  selector: 'app-users-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() users$: Observable<User[]>;
  @Output() updateRole = new EventEmitter<UpdateRoleEvent>();
  @Output() deleteUser = new EventEmitter<DeleteUserEvent>();

  displayedColumns = ['name', 'role', 'photo', 'delete'];

  constructor() {}

  ngOnInit(): void {}

  roleChange(role: ROLE, uid: string) {
    this.updateRole.emit({ role, uid });
  }

  onDeleteClick(user: User) {
    this.deleteUser.emit({ user });
  }
}
