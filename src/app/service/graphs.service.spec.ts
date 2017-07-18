import { TestBed, inject } from "@angular/core/testing";

import { GraphsService } from "./graphs.service";

describe("GraphService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphsService]
    });
  });

  it("should be created", inject([GraphsService], (service: GraphsService) => {
    expect(service).toBeTruthy();
  }));
});
