import {TestBed, async, ComponentFixture} from "@angular/core/testing";
import { Component, Input, Type } from "@angular/core";

import { AppComponent } from "./app.component";

@Component({selector: "app-header", template: ""})
class HeaderComponent {}
@Component({selector: "app-toolbar", template: ""})
class ToolbarComponent {}
@Component({selector: "app-core", template: ""})
class CoreComponent {
  @Input() componentType: Type<any>;
}

describe("AppComponent", () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: any;
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [
        AppComponent,
        HeaderComponent,
        ToolbarComponent,
        CoreComponent
      ]

    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;

    });

  }));
  it("should create the app", async(() => {

    expect(component).toBeTruthy();

  }));

});
