import express from "express";
import { jwtAuth } from "../services/jwtAuth";
import { addNote, getNote } from "../controllers/notes.controller";

const noteRouter = express.Router();

noteRouter.post("/add", jwtAuth, addNote);
noteRouter.get("/get/:id", jwtAuth, getNote);

export default noteRouter;
