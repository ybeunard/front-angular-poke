import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTasksListComponent } from './unit-tasks-list.component';

describe('UnitTasksListComponent', () => {
  let component: UnitTasksListComponent;
  let fixture: ComponentFixture<UnitTasksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitTasksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
