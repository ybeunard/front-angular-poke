import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreEnvironmentComponent } from './core-environment.component';

describe('CoreEnvironmentComponent', () => {
  let component: CoreEnvironmentComponent;
  let fixture: ComponentFixture<CoreEnvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreEnvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
