import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/core';
import { Observable } from 'rxjs';
import { ROLE } from '@app/core/services/user/users.interface';

@Component({
  selector: 'app-users-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() users$: Observable<User[]>;

  displayedColumns = ['name', 'role', 'photo'];

  constructor() {}

  ngOnInit(): void {}

  roleChange(newRole: ROLE) {
    console.log('newRole', newRole);
  }
}
