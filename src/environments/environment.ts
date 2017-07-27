// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const urlServerBack: string = "http://172.18.36.38:5000";

export const environment: any = {

  production: false,

  keyCacheInstanceRunning: "instanceRunning",
  intervalRequeteLog: 5000,

  urlGetAllActions: urlServerBack + "/modules/*/actions/",
  urlGetAction: urlServerBack + "/modules/*/actions/id",
  urlPutAction: urlServerBack + "/modules/module_id/actions/",
  urlPostAction: urlServerBack + "/modules/module_id/actions/id",
  urlDeleteAction: urlServerBack + "/modules/*/actions/id",
  urlExecuteAction: urlServerBack + "/modules/*/actions/id/execute",

  urlGetAllModules: urlServerBack + "/modules/",
  urlPutModule: urlServerBack + "/modules/",
  urlPostModule: urlServerBack + "/modules/id",
  urlDeleteModule: urlServerBack + "/modules/id",

  urlGetAllScenario: urlServerBack + "/scenarios/?lazy",
  urlGetScenario: urlServerBack + "/scenarios/id",
  urlPutScenario: urlServerBack + "/scenarios/",
  urlPostScenario: urlServerBack + "/scenarios/id",

  urlGetAllInstancesStatusWorking: urlServerBack + "/scenarios/instances/?status=WORKING&lazy",
  urlGetInstance: urlServerBack + "/scenarios/instances/id",
  urlExecuteInstanceScenario: urlServerBack + "/scenarios/id/execute"

};
