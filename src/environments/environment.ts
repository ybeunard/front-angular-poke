// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const urlServeurBack: string = "http://172.18.36.112:5000";

export const environment: any = {

  production: false,

  keyCacheInstanceRunning: "instanceRunning",
  intervalRequeteLog: 5000,

  urlGetAllActions: urlServeurBack + "/modules/*/actions/",
  urlGetAction: urlServeurBack + "/modules/*/actions/id",
  urlExecuteAction: urlServeurBack + "/modules/*/actions/id/execute",

  urlGetAllModules: urlServeurBack + "/modules/",

  urlGetAllScenario: urlServeurBack + "/scenarios/?lazy",
  urlGetScenario: urlServeurBack + "/scenarios/id",
  urlPutScenario: urlServeurBack + "/scenarios/",
  urlPostScenario: urlServeurBack + "/scenarios/id",

  urlGetAllInstancesStatusWorking: urlServeurBack + "/scenarios/instances/?status=WORKING&lazy",
  urlGetInstance: urlServeurBack + "/scenarios/instances/id",
  urlExecuteInstanceScenario: urlServeurBack + "/scenarios/id/execute"

};
