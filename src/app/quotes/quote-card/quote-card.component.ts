import { Component, OnInit, Input } from '@angular/core';
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
  constructor() {}

  ngOnInit() {}
}
