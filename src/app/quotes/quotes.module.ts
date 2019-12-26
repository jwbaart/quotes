import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes.component';
import { QuoteTableComponent } from './quote-table/quote-table.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [QuotesComponent, QuoteTableComponent],
  imports: [CommonModule, MatTableModule]
})
export class QuotesModule {}
