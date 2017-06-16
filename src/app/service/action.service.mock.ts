import {Observable} from "rxjs/Observable";

export const mockUrlAction: any = {
  actions: [
    { id: 0, module_id: 0, label: "Clone an existing reposiroty", category: "Create", command: "git clone", args: "Path of the repository" },
    { id: 1, module_id: 0, label: "Create a new local repository", category: "Create", command: "git init", args: "null" },
    { id: 2, module_id: 1, label: "Create a new bare repository", category: "Create", command: "git init --bare", args: "null" },
    { id: 3, module_id: 1, label: "List all currently configured remotes", category: "Update & Publish", command: "remote", args: "null" },
  ]
};
export class ActionsServiceMock {

  getListActionsSortByModule() {

    return Observable.of([
      { moduleName: "module1",
        actions: [
          { id: 1,
            module_id: 1,
            category: "",
            label: "",
            command: "",
            args: ""}
            ],
        visibility: false
      }]);

  }

}
