import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthService } from './services/auth.service';
import { SnackbarService } from './services/snackbar.service';
import { FirestoreCrudService } from './services/firestore-crud.service';
import { UserService } from './services/user.service';

@NgModule({
  providers: [AngularFireAuthGuard, AuthService, SnackbarService, FirestoreCrudService, UserService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Only import in app');
    }
  }
}
