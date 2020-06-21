import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { EditAuthenticatedUserDialogComponent } from './edit-authenticated-user-dialog/edit-authenticated-user-dialog.component';
import { EditAuthenticatedUserComponent } from './edit-authenticated-user/edit-authenticated-user.component';

@NgModule({
  declarations: [EditAuthenticatedUserDialogComponent, EditAuthenticatedUserComponent],
  imports: [CommonModule, SharedModule]
})
export class ComponentsModule {}
