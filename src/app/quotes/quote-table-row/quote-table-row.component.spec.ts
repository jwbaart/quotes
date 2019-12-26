import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteTableRowComponent } from './quote-table-row.component';

describe('QuoteTableRowComponent', () => {
  let component: QuoteTableRowComponent;
  let fixture: ComponentFixture<QuoteTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteTableRowComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
