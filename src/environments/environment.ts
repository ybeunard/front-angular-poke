// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const urlServeurBack: string = "http://172.18.36.38:5000";

export const environment: any = {

  production: false,
  urlAction: urlServeurBack + "/actions",
  urlModule: urlServeurBack + "/modules"

};
