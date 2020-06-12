import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from '../quotes.service';
import { Observable } from 'rxjs';
import { User } from '@app/core';

export interface Author {
  name: string;
  photoUrl: string;
}

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {
  @Input() quote: Quote;
  @Input() user$: Observable<User>;
  @Input() showEditButtons: Observable<boolean>;

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
