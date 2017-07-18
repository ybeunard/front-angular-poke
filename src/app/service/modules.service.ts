import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { isUndefined } from "util";

import { environment } from "../../environments/environment";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Action, Module, Task } from "../front-ops";

@Injectable()
export class ModulesService {

  // list of all modules available
  private listModules: Array<Module> = [];

  // return observable list of all modules with a visibility set at false
  getAllModules(): Observable<Array<Module>> {

    if(this.listModules && this.listModules.length > 0) {

      return Observable.of(this.listModules);

    }
    return this.http.get(environment.urlGetAllModules)
      .map(response => {

        const responseModules: Array<any> = response.json().modules || { };
        responseModules.forEach((module: any) => {

          this.listModules.push({ id: module.id, label: module.label, actions: module.actions, visibility: false});

        });
        return this.listModules;

      })
      .catch(error => ModulesService.handleError(error , "getAllModules: "));

  }

  // refresh listModules after call update on Modules and Actions table on database
  refreshAllModules() {

    this.listModules = [];

  }

  // return observable label of one module id in params
  getLabelModule(idModule: number): Observable<string> {

    return this.getAllModules()
      .map(response => {

        const moduleFind: Module = response.find((module: Module) => module.id === idModule);
        if(isUndefined(moduleFind)) {

          return "Not Exist";

        }
        return moduleFind.label;

      });

  }

  //return observable of all moduleId of all task in params
  foundModuleId(tasks: Array<Task>): Observable<Array<{idModule: number, idTask: number}>> {

    return this.getAllModules()
      .map(response => {

          let moduleId: Array<{idModule: number, idTask: number}> = [];
          response.forEach(function (module: Module) {

            tasks.forEach(function (task: Task) {

              if(module.actions.findIndex((action: Action) => action.id === task.inner_scenario_id) > -1) {

                moduleId.push({idModule: module.id, idTask: task.inner_scenario_id});

              }

            });

          });
          return moduleId;

      });

  }

  constructor(private http: Http) { }

  private static handleError (error: Response | any, functionName: string) {

    let errMsg: string = "ModulesService: " + functionName;
    if (error instanceof Response) {

      const body: any = error.json() || "";
      const err: string = body.error || JSON.stringify(body);
      errMsg += `${error.status} - ${error.statusText || ""} ${err}`;

    } else {

      errMsg += error.message ? error.message : error.toString();

    }
    return Observable.throw(errMsg);

  }

}
