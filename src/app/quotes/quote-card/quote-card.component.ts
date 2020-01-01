import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Child } from '../quotes.service';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {
  @Input() text: string;
  @Input() children: {
    [key in Child]: boolean;
  };
  @Output() editQuote = new EventEmitter<any>();
  @Output() deleteQuote = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onQuoteEditClick() {
    this.editQuote.emit();
  }

  onQuoteDeleteClick() {
    this.deleteQuote.emit();
  }
}
