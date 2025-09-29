import express from "express";
import { jwtAuth } from "../services/jwtAuth";
import {
  addNote,
  deleteNote,
  getAllNote,
  getNote,
  restoreNote,
  searchNote,
} from "../controllers/notes.controller";

const noteRouter = express.Router();

noteRouter.post("/add", jwtAuth, addNote);
noteRouter.get("/get/:id", jwtAuth, getNote);
noteRouter.get("/getall", jwtAuth, getAllNote);
noteRouter.get("/search", jwtAuth, searchNote);
noteRouter.put("/delete/:id", jwtAuth, deleteNote);
noteRouter.put("/restore/:id", jwtAuth, restoreNote);

export default noteRouter;
