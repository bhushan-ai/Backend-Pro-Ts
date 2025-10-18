import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../model/user.model";

const secret = process.env.JWT_SECRET as string;

export const jwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(400).json({ success: false, message: "Token not available" });
      return;
    }

    const decodedToken = jwt.verify(token, secret) as {
      id: string;
    };

    const user = await User.findById(decodedToken.id);

    if (!user) {
      res
        .status(404)
        .json({ success: false, message: "User is not found" });
      return;
    }

    req.user = user;
    next();
  }  catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong in user Authentication`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
