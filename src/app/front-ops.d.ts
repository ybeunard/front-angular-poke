export class Module {

  id: number;
  label: string;
  actions: Array<Action>;
  visibility: boolean;

}

export class Action {

  id: number;
  category: string;
  label: string;
  command: string;
  args: string;
  args_helper: string;
  working_status: boolean;

}

export class Scenario {

  id: number;
  label: string;
  description: string;
  starter_task_id: number;
  tasks: Array<Task>;

}

export class Task {

  id: number;
  inner_scenario_id: number;
  label: string;
  description: string;
  action_id: number;
  args: string;
  success_id: number;
  error_id: number;

}

export class Instance {

  id: number;
  scenario_id: number;
  begin_datetime: string;
  end_datetime: string;
  status: string;
  logs: Array<Log>;

}

export class Log {

  id: number;
  status: number;
  label: string;
  output: string;
  begin_datetime: string;
  end_datetime: string;
  visibility: boolean;

}

// graphical graph for Sigma

export class Graph {

  nodes: Array<Node>;
  edges: Array<Edge>;

}

export class Node {

  id: number;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;

}

export class Edge {

  id: number;
  source: number;
  target: number;
  type: string;
  color: string;

}
