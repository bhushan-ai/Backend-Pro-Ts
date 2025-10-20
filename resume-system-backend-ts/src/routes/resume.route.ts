import express, { Router } from "express";

import { jwtAuth } from "../middlewares/jwtAuth";
import {
  createResume,
  deleteResume,
  fetchResume,
  updateResume,
} from "../controllers/resume.controller";

const resumeRouter = Router();

//private routes
resumeRouter.post("/create", jwtAuth, createResume);
resumeRouter.put("/update", jwtAuth, updateResume);
resumeRouter.post("/delete", jwtAuth, deleteResume);
resumeRouter.get("/fetch/:id", jwtAuth, fetchResume);

export default resumeRouter;
