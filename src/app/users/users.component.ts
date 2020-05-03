import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService } from '@app/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', './../core/page.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
}
