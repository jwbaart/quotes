import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
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
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { QuoteEditDialogComponent } from './quote-edit-dialog/quote-edit-dialog.component';

@NgModule({
  declarations: [
    QuotesComponent,
    QuoteTableComponent,
    AddQuoteDialogComponent,
    QuoteCardComponent,
    QuoteFormComponent,
    QuoteEditDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
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
  entryComponents: [AddQuoteDialogComponent, QuoteEditDialogComponent]
})
export class QuotesModule {}
