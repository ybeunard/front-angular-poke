import { TestBed, inject, async } from "@angular/core/testing";
import {HttpModule, Response, ResponseOptions, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

import { ModulesService } from "./modules.service";
import { mockUrlModule } from "./modules.service.mock";
import { environment } from "../../environments/environment";

describe("ModulesService", () => {

  let modulesService: ModulesService;
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      imports: [
        HttpModule
      ],
      providers: [
        ModulesService,
        { provide: XHRBackend, useClass: MockBackend }
      ]

    }).compileComponents().then(inject([ ModulesService, XHRBackend ], (service, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {

        // mock url getAllModules
        if (connection.request.url === environment.urlModule) {

            connection.mockRespond(new Response(new ResponseOptions({

              body: JSON.stringify(mockUrlModule)

            })));

        }

      });
      modulesService = service;

    }));

  }));
  describe("getAllModules", () => {

    it("should return an Observable<Array<Module>>", () => {

        modulesService.getAllModules().subscribe((modules) => {

          expect(modules.length).toBe(4);

        });

    });

  });

});
