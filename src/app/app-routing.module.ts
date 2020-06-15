import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  customClaims,
  AngularFireAuthGuard
} from '@angular/fire/auth-guard';
import { QuotesComponent } from './quotes/quotes.component';
import { UsersComponent } from './users/users.component';
import { VerificationComponent } from './verification/verification.component';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ROLE } from './core';

const adminOnly = () =>
  pipe(
    customClaims,
    map(claims => {
      console.log('claims', claims);
      return (
        (claims.hasOwnProperty('role') && claims.role === ROLE.ADMIN) ||
        (claims.hasOwnProperty('admin') && claims.admin)
      );
    })
  );
const redirectUnauthorizedToIntro = () => redirectUnauthorizedTo(['intro']);
const redirectLoggedInToQuotes = () => redirectLoggedInTo(['quotes']);

// TODO: Verification, 2 possibles outcomes
//       https://itnext.io/handle-restricted-routes-in-angular-with-route-guards-95c93be9d05e
// const redirectNonUknownRolestoQuotesAndUnauthorizedToIntro()

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToIntro }
  },
  {
    path: 'quotes',
    component: QuotesComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToIntro }
  },
  {
    path: 'intro',
    component: IntroComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToQuotes }
  },
  {
    path: 'verification',
    component: VerificationComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToIntro }
  },
  {
    path: '**',
    redirectTo: 'intro'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
