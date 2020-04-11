import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  environmentTitle: string;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.environmentTitle = environment.firebase.projectId;
  }

  isLoggedIn() {
    
    return this.authService.isLoggedIn();
  }

  isLoggedOut() {
    return this.authService.isLoggedOut();
  }
}
