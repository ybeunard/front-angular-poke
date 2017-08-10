import { Environment, SaltAttribute } from "../front-ops";

export const urlGetAllEnvironment: Array<Environment> =
  [{ id: 1, pattern: "INT01", label: "environement int01", description: "", category: "default", status: true },
    { id: 2, pattern: "INT02", label: "environement int02", description: "", category: "default", status: true },
    { id: 3, pattern: "INT03", label: "environement int03", description: "", category: "default", status: false },
    { id: 4, pattern: "role=apache", label: "environement apache", description: "", category: "apache", status: true },
    { id: 5, pattern: "role=tomcat", label: "environement tomcat", description: "", category: "tomcat", status: false }];

export const urlGetAllSaltAttribute: Array<SaltAttribute> =
  [{id: 1, label: "int01", category: "env", pattern: "pattern*int01"},
    {id: 2, label: "int02", category: "env", pattern: "pattern*int02"},
    {id: 3, label: "tomcat", category: "role", pattern: "pattern*tomcat"}];
