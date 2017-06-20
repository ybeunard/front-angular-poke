import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CoreScenarioComponent } from "./core-scenario.component";

describe("CoreScenarioComponent", () => {
  let component: CoreScenarioComponent;
  let fixture: ComponentFixture<CoreScenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreScenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
