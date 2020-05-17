import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '@app/core';
import { Observable } from 'rxjs';
import { ROLE } from '@app/core/services/user/users.interface';

export interface UpdateRoleEvent {
  role: ROLE;
  uid: string;
}
@Component({
  selector: 'app-users-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() users$: Observable<User[]>;
  @Output() updateRole = new EventEmitter<UpdateRoleEvent>();

  displayedColumns = ['name', 'role', 'photo'];

  constructor() {}

  ngOnInit(): void {}

  roleChange(role: ROLE, uid: string) {
    this.updateRole.emit({ role, uid });
  }
}
