import express from "express";
import {
  addTask,
  allTask,
  deleteAll,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/task.controller";
import { JwtAuth } from "../services/jwtAuth";

const taskRouter = express.Router();

//private routes
taskRouter.post("/add", JwtAuth, addTask);
taskRouter.get("/get/:id", JwtAuth, getTask);
taskRouter.delete("/delete/:id", JwtAuth, deleteTask);
taskRouter.delete("/deletemany", JwtAuth, deleteAll);
taskRouter.put("/update/:id", JwtAuth, updateTask);
taskRouter.get("/getall", JwtAuth, allTask);

export default taskRouter;
