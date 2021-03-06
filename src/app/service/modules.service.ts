import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { isNullOrUndefined, isUndefined } from "util";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { environment } from "../../environments/environment";

import { Module } from "../front-ops";

@Injectable()
export class ModulesService {

  // list of all modules available
  private static listModules: Array<Module> = [];

  // return observable list of all modules with a visibility set at false
  public getAllModules(): Observable<Array<Module>> {

    if(ModulesService.listModules && ModulesService.listModules.length > 0) {

      return Observable.of(ModulesService.listModules);

    }
    return this.http.get(environment.urlGetAllModules)
      .map(response => {

        if(response.status === 204) {

          return [];

        }
        ModulesService.listModules = response.json().modules || [];
        return ModulesService.listModules;

      })
      .catch(error => ModulesService.handleError(error));

  }

  // return observable label of one module id in params
  public getLabelModule(module_id: number): Observable<string> {

    return this.getAllModules()
      .map(response => {

        const moduleFind: Module = response.find((moduleTest: Module) => moduleTest.id === module_id);
        if(isUndefined(moduleFind)) {

          return "Not Exist";

        }
        return moduleFind.label;

      });

  }

  // return observable with the return of the put request
  public putModule(module: Module): Observable<string> {

    return this.http.put(environment.urlPutModule, { module: { label: module.label, command: module.command } })
      .map(response => {

        ModulesService.refreshAllModules();
        if(isNullOrUndefined(response.json().data)) {

          return "";

        }
        return response.json().data.message || "";

      })
      .catch(error => ModulesService.handleError(error));

  }

  // return observable with the return of the post request
  public postModule(module: Module): Observable<string> {

    return this.http.post(environment.urlPostModule.replace("id", module.id), { module: { label: module.label, command: module.command } })
      .map(response => {

        ModulesService.refreshAllModules();
        if(isNullOrUndefined(response.json().data)) {

          return "";

        }
        return response.json().data.message || "";

      })
      .catch(error => ModulesService.handleError(error));

  }

  // return observable with the return of the delete request
  public deleteModule(moduleId: number): Observable<string> {

    return this.http.delete(environment.urlDeleteModule.replace("id", moduleId))
      .map(response => {

        ModulesService.refreshAllModules();
        if(isNullOrUndefined(response.json().data)) {

          return "";

        }
        return response.json().data.message || "";

      })
      .catch(error => ModulesService.handleError(error));

  }

  // refresh listModules after call update on Modules and Actions table on database
  public static refreshAllModules() {

    ModulesService.listModules = [];

  }

  constructor(private http: Http) { }

  private static handleError (error: Response | any): Observable<Response> {

    let errMsg: string;
    if (error instanceof Response) {

      const body: any = error.json().data || error.json();
      errMsg = `${error.status} - ${body.message || "Unreachable server"}`;

    } else {

      errMsg = error.message ? error.message : "Unreachable server";

    }
    return Observable.throw(errMsg);

  }

}
