import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MdIconModule, MdToolbarModule } from "@angular/material";

import { ToolbarComponent } from "./toolbar.component";

describe("ToolbarComponent", () => {

  let fixture: ComponentFixture<ToolbarComponent>;
  let component: any;
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [ ToolbarComponent ],
      imports: [
        MdIconModule,
        MdToolbarModule
      ]

    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(ToolbarComponent);
      component = fixture.debugElement.componentInstance;

    });

  }));
  it("should be created", async(() => {

    expect(component).toBeTruthy();

  }));

});
