import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User, ROLE } from '@app/core';

export interface EditAuthenticatedUser {
  name: string;
  role: ROLE;
  photoUrl: string;
}
@Component({
  selector: 'app-edit-authenticated-user',
  templateUrl: './edit-authenticated-user.component.html',
  styleUrls: ['./edit-authenticated-user.component.scss']
})
export class EditAuthenticatedUserComponent implements OnInit {
  @Input() name;
  @Input() role;
  @Input() photoUrl;

  constructor() {}

  ngOnInit(): void {}
}
