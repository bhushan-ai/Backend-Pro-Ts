import express, { Request, Response } from "express";
import Product from "../../models/product.model";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allProducts = await Product.find({});

    if (!allProducts) {
      res
        .status(404)
        .json({ success: false, message: "No products available" });
      return;
    }

    res.status(200).json({
      success: false,
      message: "all products fetched",
      data: allProducts,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while fetching the product`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
