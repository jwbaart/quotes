import { TestBed } from '@angular/core/testing';

import { EnrichedQuotesService } from './enriched-quotes.service';

describe('EnrichedQuotesService', () => {
  let service: EnrichedQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrichedQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
