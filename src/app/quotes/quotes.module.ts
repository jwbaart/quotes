import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { QuotesComponent } from './quotes.component';
import { QuoteTableComponent } from './quote-table/quote-table.component';
import { QuoteTableRowComponent } from './quote-table-row/quote-table-row.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [QuotesListComponent, QuotesComponent, QuoteTableComponent, QuoteTableRowComponent],
  imports: [CommonModule, MatTableModule]
})
export class QuotesModule {}
