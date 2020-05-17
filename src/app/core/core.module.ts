import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthService } from './services/auth.service';
import { SnackbarService } from './services/snackbar.service';
import { FirestoreCrudService } from './services/firestore-crud.service';
import { UserService } from './services/user/user.service';
import { NavigationService } from './services/navigation.service';
import { RolesService } from './services/roles/roles.service';

@NgModule({
  providers: [
    AngularFireAuthGuard,
    AuthService,
    SnackbarService,
    FirestoreCrudService,
    UserService,
    NavigationService,
    RolesService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Only import in app');
    }
  }
}
