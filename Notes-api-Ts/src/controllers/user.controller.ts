import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//token creation
const createToken = (id: string): string => {
  return jwt.sign({ id }, process.env.SECRET!, { expiresIn: "4d" });
};

//register
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  try {
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(409)
        .json({ success: false, message: "user is already exist" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    if (!newUser) {
      res.status(500).json({ success: false, message: "user is not created" });
      return;
    }

    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while registering the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "all fields are required" });
      return;
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    //match password
    const matchedPassword = await bcrypt.compare(
      password,
      findUser?.password as string
    );

    if (!matchedPassword) {
      res
        .status(401)
        .json({ success: false, message: "password is incorrect" });
      return;
    }
    const token = createToken(findUser._id.toString());
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      maxAge: 4 * 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ success: true, message: "LoggedIn successfully", token: token });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while login the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
    });
    res.status(200).json({
      success: true,
      message: "loggedOut successfully",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while registering the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//updated user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }
    const id: string = req.user?._id;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...req?.body,
      },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not updated" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "user updated", data: updatedUser });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while updating user the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//reset  password
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!req.user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }
    const id: string = req.user?._id;

    if (!oldPassword) {
      res
        .status(400)
        .json({ success: false, message: "old password is required" });
      return;
    }

    if (!newPassword) {
      res
        .status(400)
        .json({ success: false, message: "new password is  required" });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }
    const oPassword = user?.password as string;

    const compare = await bcrypt.compare(oldPassword, oPassword);

    if (!compare) {
      res
        .status(402)
        .json({ success: false, message: "old password is incorrect" });
      return;
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user?.save();

    res.status(200).json({ success: true, message: "user password changed" });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while resetting password `, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
