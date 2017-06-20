import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CoreComponent } from "./core-action.component";

describe("CoreComponent", () => {

  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [ CoreComponent ]

    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(CoreComponent);
      component = fixture.debugElement.componentInstance;

    });

  }));
  it("should be created", () => {

    expect(component).toBeTruthy();

  });

});
