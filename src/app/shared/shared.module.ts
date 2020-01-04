import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [],
  imports: [CommonModule, FlexLayoutModule, InlineSVGModule],
  exports: [CommonModule, FlexLayoutModule, InlineSVGModule]
})
export class SharedModule {}
