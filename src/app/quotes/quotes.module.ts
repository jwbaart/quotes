import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuotesComponent } from './quotes.component';
import { QuoteTableComponent } from './quote-table/quote-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AddQuoteDialogComponent } from './add-quote-dialog/add-quote-dialog.component';

@NgModule({
  declarations: [QuotesComponent, QuoteTableComponent, AddQuoteDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  entryComponents: [AddQuoteDialogComponent]
})
export class QuotesModule {}
