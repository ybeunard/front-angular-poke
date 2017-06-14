import {TestBed, async, ComponentFixture} from "@angular/core/testing";
import { MdIconModule, MdToolbarModule } from "@angular/material";

import { AppComponent } from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";

describe("AppComponent", () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [
        AppComponent,
        ToolbarComponent,
        HeaderComponent
      ],
      imports: [
        MdIconModule,
        MdToolbarModule
      ]

    }).compileComponents();

  }));
  it("should create the app", async(() => {

    const fixture: ComponentFixture<any> = TestBed.createComponent(AppComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

  }));

});
