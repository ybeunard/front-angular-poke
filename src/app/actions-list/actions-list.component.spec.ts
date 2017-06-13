import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsListComponent } from './actions-list.component';

describe('ActionsListComponent', () => {
  let component: ActionsListComponent;
  let fixture: ComponentFixture<ActionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
