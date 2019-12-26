import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes.component';
import { QuoteTableComponent } from './quote-table/quote-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AddQuoteDialogComponent } from './add-quote-dialog/add-quote-dialog.component';

@NgModule({
  declarations: [QuotesComponent, QuoteTableComponent, AddQuoteDialogComponent],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  entryComponents: [AddQuoteDialogComponent]
})
export class QuotesModule {}
