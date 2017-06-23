export const mockUrlTask = {
  starter: 0,
  tasksById: {
    0: {
      id: 0,
      action: { id: 1, module_id: 1, label: "Create a new local repository", category: "Create", command: "git init", args: "null" },
      x: 0,
      y: 0,
      size: 3,
      success: 1,
      error: -1
    },
    1: {
      id: 1,
      action: { id: 3, module_id: 1, label: "Changed files in your working directory", category: "Local changes", command: "git status", args: "You can add git status flags" },
      x: 1,
      y: 0,
      size: 3,
      success: 2,
      error: -1
    },
    2: {
      id: 2,
      action: { id: 11, module_id: 1, label: "List all existing branches", category: "Branches & Tags", command: "git branch", args: "null" },
      x: 2,
      y: 0,
      size: 3,
      success: -1,
      error: -1
    }
  }

};
