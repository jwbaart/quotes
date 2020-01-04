import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from '../quotes.service';
import * as cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss']
})
export class QuoteFormComponent implements OnInit {
  @Input() quote: Quote;
  @Output() submittedQuote = new EventEmitter<Quote>();

  formQuote;

  constructor() {}

  ngOnInit() {
    // TODO: When editing this.quote, the parent is changed. 2 way data binding!?
    this.formQuote = cloneDeep(this.quote);
    // convert JS date to iso date string
    this.formQuote.datestamp = this.formQuote.datestamp.toISOString();
  }

  onSubmitClick(quote: Quote) {
    // convert iso date string to JS date
    const datestamp = new Date(this.formQuote.datestamp);
    this.submittedQuote.emit({ ...this.formQuote, datestamp });
  }
}
