import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MdToolbarModule} from "@angular/material";

import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {

  let fixture: ComponentFixture<HeaderComponent>;
  let component: any;
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [ HeaderComponent ],
      imports: [ MdToolbarModule ]

    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.debugElement.componentInstance;

    });

  }));
  it("should be created", async(() => {

    expect(component).toBeTruthy();

  }));

});
