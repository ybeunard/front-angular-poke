import { Action } from "../front-ops";

export const mockGetAllActions: Array<Action> = [
    { id: 0, label: "Clone an existing reposiroty", category: "Create", command: "git clone", args: "Path of the repository", args_helper: "Path of the repository", is_tested: false },
    { id: 1, label: "Create a new local repository", category: "Create", command: "git init", args: null, args_helper: null, is_tested: false },
    { id: 2, label: "Create a new bare repository", category: "Create", command: "git init --bare", args: null, args_helper: null, is_tested: true },
    { id: 3, label: "List all currently configured remotes", category: "Update & Publish", command: "remote", args: null, args_helper: "You can add git status flags", is_tested: true }
];

export class ActionsServiceMock { }
