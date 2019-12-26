import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuoteDialogComponent } from './add-quote-dialog.component';

describe('AddQuoteDialogComponent', () => {
  let component: AddQuoteDialogComponent;
  let fixture: ComponentFixture<AddQuoteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuoteDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
