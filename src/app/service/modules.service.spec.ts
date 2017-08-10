import { TestBed, inject, async } from "@angular/core/testing";
import {HttpModule, Response, ResponseOptions, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Observable } from "rxjs/Observable";

import { ModulesService } from "./modules.service";

import { mockUrlDeleteModule, mockUrlGetAllModules, mockUrlPostModule, mockUrlPutModule, mockModule } from "./modules.service.mock";

import { Module } from "../front-ops";

describe("ModulesService", () => {

  let modulesService: ModulesService;

  describe("Success Request", () => {

    beforeEach(async(() => {

      TestBed.configureTestingModule({

        imports: [
          HttpModule
        ],
        providers: [
          ModulesService,
          {provide: XHRBackend, useClass: MockBackend}
        ]

      }).compileComponents().then(inject([ModulesService, XHRBackend], (service, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {

          switch (connection.request.method) {

            // mock url Get
            case 0:
              connection.mockRespond(new Response(new ResponseOptions({

                body: {modules: mockUrlGetAllModules}

              })));
              break;

            // mock url Post
            case 1:
              connection.mockRespond(new Response(new ResponseOptions({

                body: {data: {message: mockUrlPostModule}}

              })));
              break;

            // mock url Put
            case 2:
              connection.mockRespond(new Response(new ResponseOptions({

                body: {data: {message: mockUrlPutModule}}

              })));
              break;

            // mock url Delete
            case 3:
              connection.mockRespond(new Response(new ResponseOptions({

                body: {data: {message: mockUrlDeleteModule}}

              })));
              break;

            default:
              connection.mockRespond(Observable.throw("Error Url"));
          }

        });
        modulesService = service;

      }));

    }));
    describe("getAllModules", () => {

      it("should return an Observable<Array<Module>>", () => {

        modulesService.getAllModules().subscribe((response) => {

          expect(response).toBeDefined(Array<Module>());

        });

      });

    });
    describe("getLabelModule", () => {

      it("should return an Observable<string>", () => {

        modulesService.getLabelModule(1).subscribe((response) => {

          expect(response).toBeDefined(String);

        });

      });

    });
    describe("putModule", () => {

      it("should return an Observable<string>", () => {

        modulesService.putModule(mockModule).subscribe((response) => {

          expect(response).toBeDefined(String);

        });

      });

    });
    describe("postModule", () => {

      it("should return an Observable<string>", () => {

        modulesService.postModule(mockModule).subscribe((response) => {

          expect(response).toBeDefined(String);

        });

      });

    });
    describe("deleteModule", () => {

      it("should return an Observable<string>", () => {

        modulesService.deleteModule(3).subscribe((response) => {

          expect(response).toBeDefined(String);

        });

      });

    });

  });
  describe("Failure Request", () => {

    beforeEach(async(() => {

      TestBed.configureTestingModule({

        imports: [
          HttpModule
        ],
        providers: [
          ModulesService,
          {provide: XHRBackend, useClass: MockBackend}
        ]

      }).compileComponents().then(inject([ModulesService, XHRBackend], (service, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {

          connection.mockRespond(new Response (new ResponseOptions ({

            body: {data: {message: "error test success"}},
            status: 404

          })));

        });
        modulesService = service;

      }));

    }));
    describe("getAllModules", () => {

      it("should return a string error", () => {

        modulesService.getAllModules().subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      });

    });
    describe("getLabelModule", () => {

      it("should return a string error", () => {

        modulesService.getLabelModule(1).subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      });

    });
    describe("putModule", () => {

      it("should return a string error", () => {

        modulesService.putModule(mockModule).subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      });

    });
    describe("postModule", () => {

      it("should return a string error", () => {

        modulesService.postModule(mockModule).subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      });

    });
    describe("deleteModule", () => {

      it("should return a string error", () => {

        modulesService.deleteModule(3).subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      });

    });

  });

});
