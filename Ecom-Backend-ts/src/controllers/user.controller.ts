import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id: string): string => {
  return jwt.sign({ id }, process.env.SECRET!, {
    expiresIn: "7d",
  });
};

//register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      res
        .status(400)
        .json({ success: false, message: "all fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      res.status(404).json({ success: false, message: "User not created" });
    }
    res.status(201).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while registering the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "all fields are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const ogPass = user.password;

    const matchedPassword = await bcrypt.compare(password, ogPass);

    if (!matchedPassword) {
      res
        .status(402)
        .json({ success: false, message: "Password is incorrect" });
      return;
    }

    const token = createToken(user._id.toString());
    if (!token) {
      res.status(404).json({ success: false, message: "Token is not created" });
      return;
    }

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 4 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ success: true, message: "loggedIn successful", token: token });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while logging the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//logout
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token", {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, message: "loggedOut successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while logging out the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//update
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while registering the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
