import express from "express";
import {
  login,
  logout,
  register,
  updatePassword,
  updateUser,
} from "../controllers/user.controller";
import { JwtAuth } from "../services/jwtAuth";

const userRouter = express.Router();

//public
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.put("/update-user", JwtAuth, updateUser);
userRouter.put("/update-password", JwtAuth, updatePassword);

export default userRouter;
