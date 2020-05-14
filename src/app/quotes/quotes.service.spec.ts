import { TestBed } from '@angular/core/testing';

import { QuotesService } from './quotes.service';

describe('QuotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotesService = TestBed.inject(QuotesService);
    expect(service).toBeTruthy();
  });
});
