import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuthenticatedUserDialogComponent } from './edit-authenticated-user-dialog.component';

describe('EditAuthenticatedUserDialogComponent', () => {
  let component: EditAuthenticatedUserDialogComponent;
  let fixture: ComponentFixture<EditAuthenticatedUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAuthenticatedUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuthenticatedUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
