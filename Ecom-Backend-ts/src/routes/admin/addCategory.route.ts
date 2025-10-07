import express, { Router } from "express";

import { jwtAuth } from "../../services/jwtAuth";
import { addCategory } from "../../controllers/Admin/category.controller";

const categoryRouter = Router();

categoryRouter.post("/add", jwtAuth, addCategory);

export default categoryRouter;
