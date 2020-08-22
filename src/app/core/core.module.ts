import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthService } from './services/auth.service';
import { SnackbarService } from './services/snackbar.service';
import { FirestoreCrudService } from './services/firestore-crud.service';
import { UserService } from './services/user/user.service';
import { NavigationService } from './services/navigation.service';
import { RolesService } from './services/roles/roles.service';
import { AdminService } from './services/admin/admin.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenHttpInterceptor } from './interceptors/auth-token.interceptor';
import { StorageService } from './services/storage/storage.service';

@NgModule({
  providers: [
    AngularFireAuthGuard,
    AuthService,
    SnackbarService,
    FirestoreCrudService,
    StorageService,
    UserService,
    NavigationService,
    RolesService,
    AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenHttpInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Only import in app');
    }
  }
}
