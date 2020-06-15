import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmUserDeletionComponent } from './dialog-confirm-user-deletion.component';

describe('DialogConfirmUserDeletionComponent', () => {
  let component: DialogConfirmUserDeletionComponent;
  let fixture: ComponentFixture<DialogConfirmUserDeletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmUserDeletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmUserDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
