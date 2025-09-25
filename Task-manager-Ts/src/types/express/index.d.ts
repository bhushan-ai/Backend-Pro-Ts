import { IUser } from "../../models/user.model";
import { ITask } from "../../models/task.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      task?: ITask;
    }
  }
}
