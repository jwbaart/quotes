import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material-module';
import { IntroComponent } from './intro/intro.component';
import { QuotesModule } from './quotes/quotes.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { UsersModule } from './users/users.module';
import { VerificationComponent } from './verification/verification.component';
import { VerificationModule } from './verification/verification.module';
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localeNl, 'nl');

@NgModule({
  declarations: [AppComponent, NavigationComponent, IntroComponent, VerificationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MaterialModule,
    BrowserAnimationsModule,
    QuotesModule,
    UsersModule,
    VerificationModule,
    LayoutModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl' },
    { provide: REGION, useValue: 'europe-west1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
