import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuotesComponent } from './quotes.component';
import { QuoteTableComponent } from './quote-table/quote-table.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddQuoteDialogComponent } from './add-quote-dialog/add-quote-dialog.component';
import { QuoteCardComponent } from './quote-card/quote-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [QuotesComponent, QuoteTableComponent, AddQuoteDialogComponent, QuoteCardComponent],
  imports: [
    CommonModule,
    // TODO: Move to AppModule and available in quotes and other modules
    FlexLayoutModule,
    FormsModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  entryComponents: [AddQuoteDialogComponent]
})
export class QuotesModule {}
