import { ITask } from "../../models/task.model";
import { IUser } from "../../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      task?: ITask;
    }
  }
}
