import {Observable} from "rxjs/Observable";

export const mockUrlModule: any = {
  modules: [
    { id: 0, name: "module 0" },
    { id: 1, name: "module 1" },
    { id: 2, name: "module 2" },
    { id: 3, name: "module 3" },
  ]
};
export class ModulesServiceMock {

  getAllModules() {

    return Observable.of([
      {id: 0, name: "module 0"},
      {id: 1, name: "module 1"},
      {id: 2, name: "module 2"},
      {id: 3, name: "module 3"},
    ]);

  }

};
