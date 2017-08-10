// Standard path

export class Module {

  action_list: Array<Action>;
  command: string;
  id: number;
  label: string;

}

export class Action {

  category: string;
  command: string;
  id: number;
  label: string;
  module_id: number;

}

export class Task {

  action: number;
  created_at: string;
  custom_label: string;
  id: number;
  task_params: {

    params_dict: ParamsDict;
    params_patterns: {

      args_pattern: string;
      target_pattern: string;

    };

  };

}

export class UserTask {

  id: number;
  task_id: Task;
  user_params: {

    args: string;
    target: string;

  };
  task_events: Array<EventTask>;

}

export class ParamsDict {

  args_map: Map<string, string>;
  id: number;
  target_map: Map<string, string>;

}

export class EventTask {

  id: number;
  user_task_id: UserTask;
  status: string;
  begin_date: string;
  end_date: string;

}

export class EventLog {

  id: number;
  event_task_id: EventTask;
  status_code: number;
  stdin: string;
  stdout: string;

}

// scenario path

export class Scenario {

  id: number;
  label: string;
  description: string;
  starter_task_id: number;
  scenario_tasks: Array<ScenarioTask>;

}

export class ScenarioTask {

  id: number;
  task_id: Task;
  inner_scenario_id: number;
  success_id: number;
  error_id: number;

}

export class UserScenario {

  id: number;
  scenario_id: Scenario;
  user_params: {

    args: string;
    target: string;

  };

}

export class UserScenarioInstance {

  id: number;
  user_scenario_id: UserScenario;
  user_tasks: Array<UserTask>;

}

export class EventScenario {

  id: number;
  user_scenario_instance: UserScenarioInstance;
  status: string;
  begin_date: string;
  end_date: string;
  task_events: Array<EventTask>;

}

// Environment classes

export class Environment {

  id: number;
  pattern: string;
  label: string;
  description: string;
  category: string;
  status: boolean;

}

export class SaltAttribute {

  id: number;
  label: string;
  category: string;
  pattern: string;

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
