export class Action {

  id: number;
  module_id: number;
  category: string;
  label: string;
  command: string;
  args: string;

}
export class Module {

  id: number;
  name: string;

}
export class Task {

  id: number;
  action: Action;
  x: number;
  y: number;
  size: number;
  success: number;
  error: number;

}
export class Scenario {

  id: number;
  label: string;
  startTask: number;
  tasks: number;

}
