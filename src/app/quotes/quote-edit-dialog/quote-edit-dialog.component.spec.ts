import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteEditDialogComponent } from './quote-edit-dialog.component';

describe('QuoteEditDialogComponent', () => {
  let component: QuoteEditDialogComponent;
  let fixture: ComponentFixture<QuoteEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteEditDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
