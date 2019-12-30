import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from '../quotes.service';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss']
})
export class QuoteFormComponent implements OnInit {
  @Input() quote: Quote;
  @Output() submittedQuote = new EventEmitter<Quote>();

  formQuote: Quote;

  constructor() {}

  ngOnInit() {
    // TODO: When editing this.quote, the parent is changed. 2 way data binding!?
    this.formQuote = JSON.parse(JSON.stringify(this.quote));
  }

  onSubmitClick(quote: Quote) {
    this.submittedQuote.emit(quote);
  }
}
