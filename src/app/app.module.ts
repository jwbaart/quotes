import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material-module';
import { IntroComponent } from './intro/intro.component';
import { QuotesModule } from './quotes/quotes.module';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppComponent, NavigationComponent, IntroComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase, 'quotes'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    BrowserAnimationsModule,
    QuotesModule,
    LayoutModule,
    HttpClientModule,
    InlineSVGModule.forRoot()
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
