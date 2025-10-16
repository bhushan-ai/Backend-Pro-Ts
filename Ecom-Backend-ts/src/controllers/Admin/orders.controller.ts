import { Request, Response } from "express";

export const allOrders = async (req: Request, res: Response): Promise<void> => {
  try {
      
  } catch (error) {
    const err = error as Error;
    console.log(`Something went wrong while getting the  order's of user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//payment
export const getPayment = async (req: Request, res: Response): Promise<void> => {
  try {
      
  } catch (error) {
    const err = error as Error;
    console.log(`Something went wrong while getting the  order's of user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
