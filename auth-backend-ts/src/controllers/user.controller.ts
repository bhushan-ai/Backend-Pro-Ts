import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

const createToken = (id: string): string => {
  return jwt.sign({ id }, process.env.SECRET!, { expiresIn: "7d" });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: "All fields required" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: newUser,
    });
  } catch (error: unknown) {
    const err = error as Error;

    res.status(500).json({
      success: false,
      message: "User Registration failed ",
      error: err,
    });
  }
};

//login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ success: false, message: "All fields required" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ success: false, message: "User not exist" });
      return;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });
      return;
    }

    const token = createToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "loggedIn Successful",
      data: user,
      token: token,
    });
  } catch (error: unknown) {
    const err = error as Error;

    res.status(500).json({
      success: false,
      message: "User login failed ",
      error: err,
    });
  }
};
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token", {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, message: "logout Successfully" });
  } catch (error: unknown) {
    const err = error as Error;

    res.status(500).json({
      success: false,
      message: "User Registration failed ",
      error: err,
    });
  }
};
