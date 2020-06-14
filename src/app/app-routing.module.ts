import { QuotesComponent } from './quotes/quotes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  customClaims,
  AngularFireAuthGuard
} from '@angular/fire/auth-guard';
import { UsersComponent } from './users/users.component';
import { canActivate } from '@angular/fire/auth-guard';
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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent,
    // ...canActivate(redirectUnauthorizedToIntro)
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToIntro }
  },
  {
    path: 'quotes',
    component: QuotesComponent,
    // ...canActivate(redirectUnauthorizedToIntro)
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToIntro }
  },
  {
    path: 'intro',
    component: IntroComponent,
    // ...canActivate(redirectLoggedInToQuotes)
    // ...canActivate(redirectLoggedInTo(['quotes']))
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToQuotes }
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
