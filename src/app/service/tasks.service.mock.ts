import { Task } from "../front-ops";

export const mockTask: Task = { action: 6, created_at: "Fri, 04 Aug 2017 14:11:44 GMT", custom_label: "", id: 1,
  task_params: { params_dict: {

      args_map: new Map().set("git_command", null),
      id: 1,
      target_map: new Map()

    }, params_patterns: { args_pattern: "{git_command}", target_pattern: "" }

  }

};

export const mockUrlGetAllTasks: Array<any> = [
  { action: 6, created_at: "Fri, 04 Aug 2017 14:11:44 GMT", custom_label: "", id: 1,
    task_params: { params_dict: {

      args_map: { git_command: null },
      id: 1,
      target_map: {}

      }, params_patterns: { args_pattern: "{git_command}", target_pattern: "" }

    }

  },
  { action: 27, created_at: "Fri, 04 Aug 2017 14:11:44 GMT", id: 2,
    task_params: { params_dict: {

        args_map: {},
        id: 2,
        target_map: { env: null, role: "tomcat" }

      }, params_patterns: { args_pattern: "", target_pattern: "G@role{role} and G@env:{env}" }

    }

  }
];

export const mockUrlPutTask: string = "task created";

export const mockUrlPostTask: string = "task updated";

export const mockUrlDeleteTask: string = "task deleted";

export class TasksServiceMock { }
