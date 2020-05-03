import { QuotesComponent } from './quotes/quotes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { UsersComponent } from './users/users.component';
import { canActivate } from '@angular/fire/auth-guard';

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
    ...canActivate(redirectUnauthorizedToIntro())
  },
  {
    path: 'quotes',
    component: QuotesComponent,
    ...canActivate(redirectUnauthorizedToIntro())
  },
  {
    path: 'intro',
    component: IntroComponent,
    ...canActivate(redirectLoggedInToQuotes())
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
