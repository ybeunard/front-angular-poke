import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Scenario } from "../front-ops";
import { mockUrlScenario } from "./scenarios.service.mock"

@Injectable()
export class ScenariosService {

  listScenarios: Array<Scenario>;

  getAllScenarios(): Observable<Array<Scenario>> {

    if(this.listScenarios) {

      return Observable.of(this.listScenarios);

    }
    this.listScenarios = mockUrlScenario;
    return Observable.of(this.listScenarios);

  }

}
