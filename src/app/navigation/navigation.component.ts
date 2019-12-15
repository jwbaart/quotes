import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(public authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isLoggedOut() {
    return this.authService.isLoggedOut();
  }
}
