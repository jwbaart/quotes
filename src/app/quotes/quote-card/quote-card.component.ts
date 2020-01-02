import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from '../quotes.service';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {
  @Input() quote: Quote;

  @Output() editQuote = new EventEmitter<any>();
  @Output() deleteQuote = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onQuoteEditClick() {
    this.editQuote.emit(this.quote);
  }

  onQuoteDeleteClick() {
    this.deleteQuote.emit(this.quote);
  }
}
