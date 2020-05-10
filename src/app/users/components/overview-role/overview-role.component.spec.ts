import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRoleComponent } from './overview-role.component';

describe('OverviewRoleComponent', () => {
  let component: OverviewRoleComponent;
  let fixture: ComponentFixture<OverviewRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
