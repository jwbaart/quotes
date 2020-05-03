import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() users$: Observable<User[]>;

  constructor() {}

  ngOnInit(): void {}
}
