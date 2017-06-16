import {TestBed, async, ComponentFixture} from "@angular/core/testing";
import { Component } from "@angular/core";

import { AppComponent } from "./app.component";

@Component({selector: "app-header", template: ""})
class HeaderComponent {}
@Component({selector: "app-toolbar", template: ""})
class ToolbarComponent {}
@Component({selector: "app-actions-list", template: ""})
class ActionsListComponent {}

describe("AppComponent", () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: any;
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [
        AppComponent,
        HeaderComponent,
        ToolbarComponent,
        ActionsListComponent
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
