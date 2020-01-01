import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCardHighlightComponent } from './quote-card-highlight.component';

describe('QuoteCardHighlightComponent', () => {
  let component: QuoteCardHighlightComponent;
  let fixture: ComponentFixture<QuoteCardHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteCardHighlightComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCardHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
