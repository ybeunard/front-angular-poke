import { TestBed, inject, async } from "@angular/core/testing";
import { HttpModule, Response, ResponseOptions, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Observable } from "rxjs/Observable";

import { ActionsService } from "./actions.service";
import { ModulesService } from "./modules.service";

import { mockUrlDeleteAction, mockUrlGetAllActions, mockUrlPostAction, mockUrlPutAction } from "./actions.service.mock";

import { ModulesServiceMock } from "./modules.service.mock";

import { Action } from "app/front-ops";

describe("ActionsService", () => {

  let actionsService: ActionsService;

  describe("Success Request", () => {

    beforeEach(async(() => {

      TestBed.configureTestingModule({

        imports: [HttpModule],
        providers: [
          ActionsService,
          {provide: XHRBackend, useClass: MockBackend},
          {provide: ModulesService, useClass: ModulesServiceMock}
        ]

      }).compileComponents().then(inject([ActionsService, XHRBackend, ModulesService], (service, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {

          switch (connection.request.method) {

            // mock url Get
            case 0:
              connection.mockRespond(new Response(new ResponseOptions({

                body: { actions: mockUrlGetAllActions }

              })));
              break;

            // mock url Post
            case 1:
              connection.mockRespond(new Response(new ResponseOptions({

                body: {data: {message: mockUrlPutAction}}

              })));
              break;

            // mock url Put
            case 2:
              connection.mockRespond(new Response(new ResponseOptions({

                body: {data: {message: mockUrlPostAction}}

              })));
              break;

            // mock url Delete
            case 3:
              connection.mockRespond(new Response(new ResponseOptions({

                body: {data: {message: mockUrlDeleteAction}}

              })));
              break;

            default:
              connection.mockRespond(Observable.throw("Error Url"));

          }

        });
        actionsService = service;

      }));

    }));
    describe("getAllActions", () => {

      it("should return an Observable<Array<Action>>", async(() => {

        actionsService.getAllActions().subscribe((response) => {

          expect(response).toBeDefined(Array<Action>());

        });

      }));

    });
    describe("getLabelAction", () => {

      it("should return an Observable<string>", async(() => {

        actionsService.getLabelAction(1).subscribe((response) => {

          expect(response).toBeDefined(String);

        });

      }));

    });
    describe("putAction", () => {

      it("should return an Observable<string>", async(() => {

        const actionTest: Action = {category: "Create", command: "clone", id: null, label: "Clone an existing reposiroty", module_id: 1};
        actionsService.putAction(actionTest).subscribe((response) => {

          expect(response).toBeDefined(String);

        });

      }));

    });
    describe("postAction", () => {

      it("should return an Observable<string>", async(() => {

        const actionTest: Action = {category: "Create", command: "clone", id: 1, label: "Clone an existing reposiroty", module_id: 1};
        actionsService.postAction(actionTest).subscribe((response) => {

          expect(response).toBeDefined(String);

        });

      }));

    });
    describe("deleteAction", () => {

      it("should return an Observable<string>", async(() => {

        actionsService.deleteAction(1).subscribe((response) => {

          expect(response).toBeDefined(String);

        });

      }));

    });

  });
  describe("Failure Request", () => {

    beforeEach(async(() => {

      TestBed.configureTestingModule({

        imports: [HttpModule],
        providers: [
          ActionsService,
          {provide: XHRBackend, useClass: MockBackend},
          {provide: ModulesService, useClass: ModulesServiceMock}
        ]

      }).compileComponents().then(inject([ActionsService, XHRBackend, ModulesService], (service, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {

          connection.mockRespond(new Response (new ResponseOptions ({

            body: {data: {message: "error test success"}},
            status: 404

          })));

        });
        actionsService = service;

      }));

    }));
    describe("getAllActions", () => {

      it("should return an string error", async(() => {

        actionsService.getAllActions().subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      }));

    });
    describe("getLabelAction", () => {

      it("should return an string error", async(() => {

        actionsService.getLabelAction(1).subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      }));

    });
    describe("putAction", () => {

      it("should return an string error", async(() => {

        const actionTest: Action = {category: "Create", command: "clone", id: null, label: "Clone an existing reposiroty", module_id: 1};
        actionsService.putAction(actionTest).subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      }));

    });
    describe("postAction", () => {

      it("should return an string error", async(() => {

        const actionTest: Action = {category: "Create", command: "clone", id: 1, label: "Clone an existing reposiroty", module_id: 1};
        actionsService.postAction(actionTest).subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      }));

    });
    describe("deleteAction", () => {

      it("should return an string error", async(() => {

        actionsService.deleteAction(1).subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      }));

    });

  });

});
