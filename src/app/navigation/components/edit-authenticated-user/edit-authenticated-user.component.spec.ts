import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuthenticatedUserComponent } from './edit-authenticated-user.component';

describe('EditAuthenticatedUserComponent', () => {
  let component: EditAuthenticatedUserComponent;
  let fixture: ComponentFixture<EditAuthenticatedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAuthenticatedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuthenticatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
