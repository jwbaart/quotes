import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../quote';

@Component({
  selector: 'app-quote-table',
  templateUrl: './quote-table.component.html',
  styleUrls: ['./quote-table.component.scss']
})
export class QuoteTableComponent implements OnInit {
  @Input() quotes: Quote[];
  displayedColumns: string[] = ['id', 'title', 'childr(en)'];

  constructor() {}

  ngOnInit() {}
}
