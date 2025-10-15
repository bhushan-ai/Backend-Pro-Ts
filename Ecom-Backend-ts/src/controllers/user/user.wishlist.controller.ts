import { Request, Response } from "express";
import Wishlist from "../../models/wishlist.model";

//add to wishlist
export const addToWishlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.body;

    //check user
    if (!req.user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    //check id
    const userId = req.user._id;

    //find wishlist is exist or not and update
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: { productId } } },
      { upsert: true, new: true }
    );
    if (!wishlist) {
      res
        .status(402)
        .json({ success: false, message: "Product is not added to wishlist" });
      return;
    }
    res.status(201).json({
      success: true,
      message: "product added to wishlist successfully",
      data: wishlist,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(
      `Something went wrong while adding product to the wishlist the user`,
      err
    );
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//remove wishlist
export const removeFromWishlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.body;

    //check user
    if (!req.user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    //check id
    const userId = req.user._id;

    //find wishlist is exist or not and remove
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { productId } } },
      { new: true }
    );

    if (!wishlist) {
      res
        .status(402)
        .json({ success: false, message: "Product is not removed from wishlist" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "product removed from wishlist successfully",
      data: wishlist,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(
      `Something went wrong while removing product from the wishlist the user`,
      err
    );
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
