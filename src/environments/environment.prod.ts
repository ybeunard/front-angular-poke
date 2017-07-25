const urlServerBack: string = "http://172.18.36.112:5000";

export const environment: any = {

  production: false,

  keyCacheInstanceRunning: "instanceRunning",
  intervalRequeteLog: 5000,

  urlGetAllActions: urlServerBack + "/modules/*/actions/",
  urlGetAction: urlServerBack + "/modules/*/actions/id",
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
