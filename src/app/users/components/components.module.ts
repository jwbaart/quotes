import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { DialogConfirmUserDeletionComponent } from './dialog-confirm-user-deletion/dialog-confirm-user-deletion.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { OverviewRoleComponent } from './overview-role/overview-role.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [OverviewComponent, OverviewRoleComponent, DialogConfirmUserDeletionComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [OverviewComponent, OverviewRoleComponent, DialogConfirmUserDeletionComponent]
})
export class ComponentsModule {}
