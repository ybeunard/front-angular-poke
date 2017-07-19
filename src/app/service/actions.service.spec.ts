import { TestBed, inject, async } from "@angular/core/testing";
import { HttpModule, Response, ResponseOptions, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

import { ActionsService } from "./actions.service";
import { mockGetAllActions } from "./actions.service.mock";
import { ModulesService } from "./modules.service";
import { ModulesServiceMock } from "./modules.service.mock";
import { environment } from "../../environments/environment";

describe("ActionsService", () => {

  let actionsService: ActionsService;
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      imports: [ HttpModule ],
      providers: [
        ActionsService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: ModulesService, useClass: ModulesServiceMock }
      ]

    }).compileComponents().then(inject([ ActionsService, XHRBackend, ModulesService ], (service, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {

        if (connection.request.url === environment.urlAction) {

          connection.mockRespond(new Response(new ResponseOptions({

            body: JSON.stringify(mockGetAllActions)

          })));

        }

      });
      actionsService = service;

    }));

  }));
  describe("getAllActions", () => {

    it("should return an Observable<Array<Action>>", async(() => {

      actionsService.getAllActions().subscribe((actions) => {

        expect(actions.length).toBe(4);
        expect(actions[0].label).toEqual("Clone an existing reposiroty");
        expect(actions[2].command).toEqual("git init --bare");
        expect(actions[3].category).toEqual("Update & Publish");

      });

    }));

  });

});
