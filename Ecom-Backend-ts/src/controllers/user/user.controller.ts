import { Request, Response } from "express";
import Cart from "../../models/cart.model";
import mongoose from "mongoose";

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: pId } = req.params;

    if (!pId) {
      res.status(404).json({ success: false, message: "productId not found" });
      return;
    }

    if (!req.user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const id = req.user._id;
    if (!id) {
      res.status(404).json({ success: false, message: "id not found" });
      return;
    }

    let cart = await Cart.findOne({ user: id });
    if (cart) {
    //   cart.items.push({ pId } ,{quantity: +1});
    }

    if (!cart) {
      res
        .status(401)
        .json({ success: false, message: "product is not added to cart" });
      return;
    }
    res
      .status(201)
      .json({ success: true, message: "product added to cart", data: cart });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while fetching the product`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
