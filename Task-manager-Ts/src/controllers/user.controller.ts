import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id: string): string => {
  return jwt.sign({ id }, process.env.SECRET!, {
    expiresIn: "7d",
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exist" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while registration`, err);
  }
};

//login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Email and Password is required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "user not found" });
      return;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    console.log(matchedPassword);
    if (!matchedPassword) {
      res
        .status(400)
        .json({ success: false, message: "Password is Incorrect" });
      return;
    }

    const token = createToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User LoggedIn",
      data: user,
      token: token,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while registration`, err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, message: "loggedOut Successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while registration`, err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

//update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      {
        email,
        name,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Details updated successfully",
      data: updatedUser,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

//password updated
export const updatePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword) {
      res
        .status(400)
        .json({ success: false, message: " current password required" });
      return;
    }
    if (!newPassword) {
      res
        .status(400)
        .json({ success: false, message: "new password required" });
      return;
    }

    //fetching user
    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    //compare  password
    const matchedPassword = await bcrypt.compare(oldPassword, user.password);

    if (!matchedPassword) {
      res
        .status(400)
        .json({ success: false, message: " current password is incorrect" });
      return;
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
