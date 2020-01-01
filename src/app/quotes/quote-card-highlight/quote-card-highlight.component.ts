import { Component } from '@angular/core';
import { QuoteCardComponent } from '../quote-card/quote-card.component';

@Component({
  selector: 'app-quote-card-highlight',
  templateUrl: './quote-card-highlight.component.html',
  styleUrls: ['./quote-card-highlight.component.scss']
})
export class QuoteCardHighlightComponent extends QuoteCardComponent {
  constructor() {
    super();
  }
}
