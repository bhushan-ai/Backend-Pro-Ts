import express, { Router } from "express";
import { login, logout, register } from "../../controllers/user.controller";



const userRouter = Router();

//public routes
userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/logout',logout)

export default userRouter