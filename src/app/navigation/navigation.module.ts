import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '@app/shared';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsModule } from './components/components.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    MatMenuModule,
  ],
  exports: [NavigationComponent]
})
export class NavigationModule {}
