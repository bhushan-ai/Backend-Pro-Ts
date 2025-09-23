import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";


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
