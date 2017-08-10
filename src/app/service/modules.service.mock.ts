import { Module } from "../front-ops";

export const mockModule: Module = {actions: [], command: "", id: 3, label: "Unix"};

export const mockUrlGetAllModules: Array<Module> = [

  { actions: [], command: "salt -C", id: 1, label: "salt" },
  { actions: [], command: "git", id: 2, label: "git" },
  { actions: [], command: "", id: 3, label: "Unix" }

];

export const mockUrlPutModule: string = "module created";

export const mockUrlPostModule: string = "module updated";

export const mockUrlDeleteModule: string = "module deleted";

export class ModulesServiceMock { }
