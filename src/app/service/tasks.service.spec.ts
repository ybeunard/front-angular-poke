import { TestBed, inject, async } from "@angular/core/testing";
import { HttpModule, Response, ResponseOptions, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Observable } from "rxjs/Observable";

import { TasksService } from "./tasks.service";

import { mockUrlGetAllTasks, mockUrlPutTask, mockUrlPostTask, mockUrlDeleteTask, mockTask } from "./tasks.service.mock";

import { Task } from "../front-ops";

describe("TasksService", () => {

  let tasksService: TasksService;

  describe("Success Request", () => {

    beforeEach(async(() => {

      TestBed.configureTestingModule({

        imports: [HttpModule],
        providers: [
          TasksService,
          {provide: XHRBackend, useClass: MockBackend}
        ]

      }).compileComponents().then(inject([TasksService, XHRBackend], (service, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {

          switch (connection.request.method) {

            // mock url Get
            case 0:
              connection.mockRespond(new Response(new ResponseOptions({

                body: { tasks: mockUrlGetAllTasks }

              })));
              break;

            // mock url Post
            case 1:
              connection.mockRespond(new Response(new ResponseOptions({

                body: {data: {message: mockUrlPostTask}}

              })));
              break;

            // mock url Put
            case 2:
              connection.mockRespond(new Response(new ResponseOptions({

                body: {data: {message: mockUrlPutTask}}

              })));
              break;

            // mock url Delete
            case 3:
              connection.mockRespond(new Response(new ResponseOptions({

                body: {data: {message: mockUrlDeleteTask}}

              })));
              break;

            default:
              connection.mockRespond(Observable.throw("Error Url"));

          }

        });
        tasksService = service;

      }));

    }));
    describe("getAllTasks", () => {

      it("should return an Observable<Array<Task>>", async(() => {

        tasksService.getAllTasks().subscribe((response) => {

          expect(response).toBeDefined(Array<Task>());

        });

      }));

    });
    describe("putTask", () => {

      it("should return an Observable<string>", async(() => {

        tasksService.putTask(mockTask).subscribe((response) => {

          expect(response).toBeDefined(String);

        });

      }));

    });
    describe("postAction", () => {

      it("should return an Observable<string>", async(() => {

        tasksService.postTask(mockTask).subscribe((response) => {

          expect(response).toBeDefined(String);

        });

      }));

    });
    describe("deleteAction", () => {

      it("should return an Observable<string>", async(() => {

        tasksService.deleteTask(1).subscribe((response) => {

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
          TasksService,
          {provide: XHRBackend, useClass: MockBackend}
        ]

      }).compileComponents().then(inject([TasksService, XHRBackend], (service, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {

          switch (connection.request.method) {

            default:
              connection.mockRespond(new Response (new ResponseOptions ({

                body: {data: {message: "error test success"}},
                status: 404

              })));

          }

        });
        tasksService = service;

      }));

    }));
    describe("getAllTasks", () => {

      it("should return a string error", async(() => {

        tasksService.getAllTasks().subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      }));

    });
    describe("putTask", () => {

      it("should return a string error", async(() => {

        tasksService.putTask(mockTask).subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      }));

    });
    describe("postAction", () => {

      it("should return a string error", async(() => {

        tasksService.postTask(mockTask).subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      }));

    });
    describe("deleteAction", () => {

      it("should return a string error", async(() => {

        tasksService.deleteTask(1).subscribe(() => { return; }, error => expect(error).toBe("error test success"));

      }));

    });

  });
});
