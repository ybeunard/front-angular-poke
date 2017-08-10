import {TestBed, async, ComponentFixture} from "@angular/core/testing";
import { RouterModule, Routes } from "@angular/router";
import { Component } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";

import { SelectivePreloadingStrategy } from "./selective-preloading-strategy";

import { PushNotificationsService } from "./service/push-notifications.service";
import { PushNotificationsServiceMock } from "./service/push-notifications.service.mock";

import { AppComponent } from "./app.component";

@Component({selector: "app-header", template: ""})
class HeaderComponent {}
@Component({selector: "app-toolbar", template: ""})
class ToolbarComponent {}

const mockRoutes: Routes = [];

describe("AppComponent", () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: any;
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      imports: [

        RouterModule.forRoot(mockRoutes, { preloadingStrategy: SelectivePreloadingStrategy })

      ],
      providers: [

        SelectivePreloadingStrategy,
        {provide: APP_BASE_HREF, useValue : "/" },
        {provide: PushNotificationsService, useClass: PushNotificationsServiceMock }

      ],
      declarations: [

        AppComponent,
        HeaderComponent,
        ToolbarComponent

      ]

    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;

    });

  }));
  it("should create the app", async(() => {

    expect(component).toBeTruthy();

  }));
  it("should push notification without link", async(() => {

    const title: string = "test";
    spyOn(console, "log");
    component.notify(title);
    expect(console.log).toHaveBeenCalledWith("Front Ops" + title + "undefined");

  }));
  it("should push notification with link", async(() => {

    const title: string = "test";
    const link: string = "test.com";
    spyOn(console, "log");
    component.notify(title, link);
    expect(console.log).toHaveBeenCalledWith("Front Ops" + title + link);

  }));
  it("should push error notification without link", async(() => {

    const title: string = "test error";
    spyOn(console, "log");
    component.notifyError(title);
    expect(console.log).toHaveBeenCalledWith("Front Ops" + title + "undefined");

  }));
  it("should push error notification with link", async(() => {

    const title: string = "test error";
    const link: string = "test-error.com";
    spyOn(console, "log");
    component.notifyError(title, link);
    expect(console.log).toHaveBeenCalledWith("Front Ops" + title + link);

  }));

});
