import express, { Router } from "express";
import {
  login,
  logout,
  register,
  updatePassword,
  updateUser,
} from "../../controllers/user.controller";
import { jwtAuth } from "../../services/jwtAuth";

const userRouter = Router();

//public routes
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

//private routes
userRouter.post("/update", jwtAuth, updateUser);
userRouter.post("/update-password", jwtAuth, updatePassword);

export default userRouter;
