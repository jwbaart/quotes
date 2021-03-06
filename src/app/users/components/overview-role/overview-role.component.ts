import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ROLE } from '@app/core/services/user/user.service';

export interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-overview-role',
  templateUrl: './overview-role.component.html',
  styleUrls: ['./overview-role.component.scss']
})
export class OverviewRoleComponent implements OnInit {
  @Input() activeRole: ROLE;
  @Output() activeRoleChange = new EventEmitter<ROLE>();

  editVisibility = false;
  roles: Role[] = [
    {
      value: ROLE.UNKNOWN,
      viewValue: 'Onbekend'
    },
    {
      value: ROLE.VIEWER,
      viewValue: 'Viewer'
    },
    {
      value: ROLE.EDITOR,
      viewValue: 'Editor'
    },
    {
      value: ROLE.ADMIN,
      viewValue: 'Admin'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleEditVisibility() {
    this.editVisibility = !!!this.editVisibility;
  }

  changeActiveRole(event: MatSelectChange) {
    this.toggleEditVisibility();
    this.activeRoleChange.emit(event.value);
  }
}
