import { SSTConfig } from "sst";
import MyStack from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "ProjectManagementBackend",
      region: "ap-south-1",
    };
  },
  stacks(app) {
    app.stack(MyStack);
  },
} satisfies SSTConfig;
