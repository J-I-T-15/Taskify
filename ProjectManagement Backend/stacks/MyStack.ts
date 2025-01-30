import * as sst from "@serverless-stack/resources";

export default class TaskAPI extends sst.Api {
  constructor(scope: sst.Construct, id: string) {
    super(scope, id, {
      routes: {
        "GET /tasks": "src/tasks.getTasks",
        "POST /tasks": "src/tasks.createTask",
        "GET /tasks/{id}": "src/tasks.getTask",
        "PUT /tasks/{id}": "src/tasks.updateTask",
        "DELETE /tasks/{id}": "src/tasks.deleteTask",
      },
    });
  }
}
