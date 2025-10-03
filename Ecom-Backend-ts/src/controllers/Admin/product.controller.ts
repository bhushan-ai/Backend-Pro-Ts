import express, { Request, Response } from "express";
import User from "../../models/user.model";
import Product from "../../models/product.model";

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {

    const {name,description,price,salePrice,stock} = req.body 



  try {
    if (!req.user) {
      res.status(404).json({ success: false, message: "User not found" });
    }

    const userId = req.user?._id;
    if (!userId) {
      res.status(404).json({ success: false, message: "User Id not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found in Db" });
    }

    if (user?.role !== "Admin") {
      res.status(404).json({
        success: false,
        message: "You can not add the product because you are not admin",
      });
    }

    const product = new Product({});
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while registering the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
