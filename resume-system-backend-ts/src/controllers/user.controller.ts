import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model";

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

//update user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body;

    if (!email || !name) {
      res
        .status(400)
        .json({ success: false, message: "all fields are required" });
      return;
    }

    const userId = req.user?._id;

    if (!userId) {
      res.status(404).json({ success: false, message: "userId not found" });
      return;
    }

    let user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "user details updated", data: user });
    return;
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while updating the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//updated password
export const updatePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword) {
      res
        .status(400)
        .json({ success: false, message: "old password required" });
      return;
    }
    if (!newPassword) {
      res
        .status(400)
        .json({ success: false, message: "new password required" });
      return;
    }

    const userId = req.user?._id;

    if (!userId) {
      res.status(404).json({ success: false, message: "userId not found" });
      return;
    }

    let user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }

    const oPass = user.password;

    const matchPass = await bcrypt.compare(oldPassword, oPass);

    if (!matchPass) {
      res
        .status(402)
        .json({ success: false, message: "old password is incorrect" });
      return;
    }

    const hashedPass = await bcrypt.hash(newPassword, 10);

    user.password = hashedPass || user.password;
    await user.save();

    res.status(200).json({ success: true, message: "user password updated" });
    return;
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while updating the user password`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
