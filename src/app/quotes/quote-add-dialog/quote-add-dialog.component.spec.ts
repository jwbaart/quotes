import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteAddDialogComponent } from './quote-add-dialog.component';

describe('QuoteAddDialogComponent', () => {
  let component: QuoteAddDialogComponent;
  let fixture: ComponentFixture<QuoteAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteAddDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
