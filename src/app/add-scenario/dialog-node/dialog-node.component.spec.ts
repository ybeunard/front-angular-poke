import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogNodeComponent } from "./dialog-node.component";

describe("DialogNodeComponent", () => {

  let component: DialogNodeComponent;
  let fixture: ComponentFixture<DialogNodeComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [ DialogNodeComponent ]

    })
    .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(DialogNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it("should be created", () => {

    expect(component).toBeTruthy();

  });

});
