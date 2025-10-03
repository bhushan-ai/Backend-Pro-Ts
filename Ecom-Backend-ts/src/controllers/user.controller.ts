import { Request, Response } from "express";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while registering the user`,err);
    res.status(500).json({ success: false, message: "Server side error", error:err });
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while registering the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while registering the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
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
