import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  exports: [MatToolbarModule, MatButtonModule, MatCardModule, MatTooltipModule]
})
export class MaterialModule {}
