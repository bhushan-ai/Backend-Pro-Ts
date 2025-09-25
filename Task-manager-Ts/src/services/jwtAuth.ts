import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export const JwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.token;
  
  try {
    if (!token) {
      res.status(400).json({ success: false, message: "No token" });
      return;
    }

    const decodedToken: any = jwt.verify(token, process.env.SECRET!) as {
      id: string;
    };

    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      res.status(400).json({ success: false, message: "user not found" });
      return;
    }

    req.user = user;

    next();
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong in user Authentication`, err);
  }
};
