import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core';
import { environment } from 'src/environments/environment';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public projectId: string;
  public isUsersVisible: Observable<boolean>;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.projectId = environment.firebase.projectId;
    this.isUsersVisible = combineLatest([this.authService.isAdmin$, this.authService.isLoggedIn$]).pipe(
      map(result => result[0] && result[1])
    );
  }

  resultSelector(idTokenResult, isLoggedIn) {
    return idTokenResult.claims.admin && isLoggedIn;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn$;
  }

  isLoggedOut() {
    return this.authService.isLoggedOut$;
  }

  isNonProdId(projectId: string): boolean {
    return projectId.includes('-dev-') || projectId.includes('-staging-');
  }
}
