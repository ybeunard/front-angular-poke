import {async, TestBed} from "@angular/core/testing";
import { ViewContainerRef } from "@angular/core";

import { CoreDirective } from "./core.directive";

describe("CoreDirective", () => {

  let coreDirective: CoreDirective;
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [ CoreDirective ]

    }).compileComponents().then(() => {

      let viewContainerRef: ViewContainerRef;
      coreDirective = new CoreDirective(viewContainerRef);

    });

  }));
  it("should create an instance", () => {

    expect(coreDirective).toBeTruthy();

  });
});
