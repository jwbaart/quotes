import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  constructor(public quotesService: QuotesService) {}

  ngOnInit() {
    // console.log('users', this.quotesService.users);
    this.quotesService.quotes.subscribe(quotes => console.log('quotes', quotes));
    this.quotesService.users.subscribe(users => console.log('users', users));
  }
}
