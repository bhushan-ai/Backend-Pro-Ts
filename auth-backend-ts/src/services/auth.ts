import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const jwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token;
  try {
    if (!token) {
      res.status(400).json({ success: false, message: "User not Valid" });
    }

    const decodeToken: any = jwt.verify(token, process.env.SECRET!) as {
      id: string;
    };
    const user = await User.findById(decodeToken.id).select("-password");

    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
      return;
    }
    
    req.user = user;

    next();
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: ` "Authentication failed",`,
      error: err.message,
    });
  }
};
