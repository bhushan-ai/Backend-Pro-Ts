import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const secret = process.env.SECRET as string;

export const jwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token;

  try {
    if (!token) {
      res.status(401).json({ success: false, message: "there is no token" });
      return;
    }

    const decodedToken = jwt.verify(token, secret) as {
      id: string;
    };

    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong in user Authentication`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
