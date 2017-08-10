// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const urlServerBack: string = "http://172.18.36.38:5000";

export const environment: any = {

  production: false,

  keyCacheInstanceRunning: "instanceRunning",
  keyCacheUnitTaskRunning: "unitTaskRunning",
  keyCacheActionRunning: "actionRunning",
  intervalRequeteLog: 5000,

  urlGetAllModules: urlServerBack + "/modules/",
  urlPutModule: urlServerBack + "/modules/",
  urlPostModule: urlServerBack + "/modules/id",
  urlDeleteModule: urlServerBack + "/modules/id",

  urlGetAllActions: urlServerBack + "/modules/*/actions/",
  urlPutAction: urlServerBack + "/modules/module_id/actions/",
  urlPostAction: urlServerBack + "/modules/module_id/actions/id",
  urlDeleteAction: urlServerBack + "/modules/*/actions/id",

  urlGetAllTasks: urlServerBack + "/tasks/",
  urlPutTask: urlServerBack + "/tasks/",
  urlPostTask: urlServerBack + "/tasks/id",
  urlDeleteTask: urlServerBack + "/tasks/id",

  urlGetAllScenario: urlServerBack + "/scenarios/?lazy",
  urlGetScenario: urlServerBack + "/scenarios/id",
  urlPutScenario: urlServerBack + "/scenarios/",
  urlPostScenario: urlServerBack + "/scenarios/id",

  urlGetInstance: urlServerBack + "/scenarios/instances/id",
  urlExecuteInstanceScenario: urlServerBack + "/scenarios/id/execute",

  urlPutUnitTask: urlServerBack + "/unit_tasks/",
  urlExecuteUnitTask: urlServerBack + "/unit_tasks/id/execute",

  getLogAction: urlServerBack + "/logs/unit_tasks/id",

  urlGetAllEnvironments: urlServerBack + "/environments/"

};
