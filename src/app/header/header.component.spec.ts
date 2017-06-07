import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdToolbarModule} from '@angular/material';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ MdToolbarModule ]
    })
    .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should be created', () => {

    expect(component).toBeTruthy();

  });

});