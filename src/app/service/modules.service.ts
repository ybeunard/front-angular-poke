import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../../environments/environment";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Module } from "../front-ops";

@Injectable()
export class ModulesService {

  getAllModules(): Observable<Array<Module>> {

    return this.http.get(environment.urlModule)
      .map(response => {

        return response.json().modules || { };

      })
      .catch(this.handleError);

  }
  private handleError (error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {

      const body: any = error.json() || "";
      const err: string = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;

    } else {

      errMsg = error.message ? error.message : error.toString();

    }
    return Observable.throw(errMsg);

  }
  constructor(private http: Http) { }

}
