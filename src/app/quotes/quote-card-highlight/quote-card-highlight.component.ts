import { Component, OnInit } from '@angular/core';
import { QuoteCardComponent } from '../quote-card/quote-card.component';
import { formatWithOptions } from 'date-fns/fp';
import { nl } from 'date-fns/locale';

@Component({
  selector: 'app-quote-card-highlight',
  templateUrl: './quote-card-highlight.component.html',
  styleUrls: ['./quote-card-highlight.component.scss']
})
export class QuoteCardHighlightComponent extends QuoteCardComponent implements OnInit {
  formattedDate;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.quote && this.quote.datestamp) {
      this.setFormattedDate(this.quote.datestamp);
    }
  }

  setFormattedDate(datestamp) {
    const dateToString = formatWithOptions({ locale: nl }, 'dd/MM/yyyy');

    this.formattedDate = [datestamp.toDate()].map(dateToString);
  }
}
