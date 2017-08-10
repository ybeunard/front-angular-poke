import { Action } from "../front-ops";

export const mockUrlGetAllActions: Array<Action> = [
    { category: "Create", command: "clone", id: 1, label: "Clone an existing reposiroty", module_id: 1 },
    { category: "Create", command: "init", id: 2, label: "Create a new local repository", module_id: 1 },
    { category: "Update & Publish", command: "remote", id: 3, label: "List all currently configured remotes", module_id: 1 },
    { category: "Update & Publish", command: "remote", id: 4, label: "List all currently configured remotes", module_id: 2 }
];

export const mockUrlPutAction: string = "action created";

export const mockUrlPostAction: string = "action updated";

export const mockUrlDeleteAction: string = "action deleted";

export class ActionsServiceMock { }
