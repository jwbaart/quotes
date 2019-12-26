import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../quote';

@Component({
  selector: 'app-quote-table',
  templateUrl: './quote-table.component.html',
  styleUrls: ['./quote-table.component.scss']
})
export class QuoteTableComponent implements OnInit {
  @Input() quotesData: Quote[];
  displayedColumns: string[] = ['text', 'children'];

  constructor() {}

  ngOnInit() {}
}
