import { QuotesComponent } from './quotes/quotes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { IntroComponent } from './intro/intro.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  { path: 'register', component: RegisterComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: 'intro', component: IntroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
