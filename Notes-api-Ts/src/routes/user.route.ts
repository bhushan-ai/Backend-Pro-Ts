import express from "express";
import {
  login,
  logout,
  register,
  resetPassword,
  updateUser,
} from "../controllers/user.controller";
import { jwtAuth } from "../services/jwtAuth";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/update", jwtAuth, updateUser);
userRouter.post("/reset-pass", resetPassword);

export default userRouter;
