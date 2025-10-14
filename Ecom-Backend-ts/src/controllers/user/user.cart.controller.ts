import { Request, Response } from "express";
import Cart from "../../models/cart.model";
import Product from "../../models/product.model";

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pId, quantity } = req.body;

    if (!pId) {
      res.status(404).json({ success: false, message: "productId not found" });
      return;
    }

    //check product exist or not
    const product = await Product.findById(pId);

    if (!product) {
      res.status(404).json({ success: false, message: "product not found" });
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
    if (!cart) {
      cart = new Cart({ user: id, items: [] });
    }

    const findCurrentIndexOfProduct = cart.items.findIndex(
      (index) => index.productId.toString() === pId
    );

    if (findCurrentIndexOfProduct === -1) {
      cart.items.push({ productId: pId, quantity });
    } else {
      cart.items[findCurrentIndexOfProduct].quantity += quantity;
    }
    await cart.save();
    res
      .status(201)
      .json({ success: true, message: "product added to cart", data: cart });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while adding the product to cart`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//fetch items
export const fetchItemsOfCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const id = req.user._id;
    if (!id) {
      res.status(404).json({ success: false, message: "id not found" });
      return;
    }

    const cart = await Cart.findOne({ user: id }).populate({
      path: "items.productId",
      select: "name image price salePrice",
    });

    res
      .status(200)
      .json({ success: true, message: "All product fetched", data: cart });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(
      `Something went wrong while fetching the products of cart`,
      err
    );
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//remove cart item
export const removeItemFromCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //user check
    if (!req.user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const id = req.user._id;
    //id check
    if (!id) {
      res.status(404).json({ success: false, message: "id not found" });
      return;
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.log(
      `Something went wrong while removing the products from cart`,
      err
    );
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
