import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    InlineSVGModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    InlineSVGModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class SharedModule {}
