import express, { Request, Response } from "express";
import User from "../../models/user.model";
import Product from "../../models/product.model";
import { imageUploadToCloudinary } from "../../services/cloudinary";

//handle img
export const handleImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(404).json({ success: false, message: "Image not found" });
      return;
    }
    const bufferFile = req.file;

    const b64 = Buffer.from(bufferFile.buffer).toString("base64");
    const url = `data:${bufferFile.mimetype};base64,${b64}`;
    const imageUrl = await imageUploadToCloudinary(url);

    if (imageUrl === null) {
      res
        .status(404)
        .json({ success: false, message: "Image url not created" });
      return;
    }
    res
      .status(201)
      .json({ success: true, message: "Image uploaded successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while uploading image the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//add product
export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //check user
    if (!req.user) {
      res.status(404).json({ success: false, message: "User not found" });
    }

    //check user id
    const userId = req.user?._id;
    if (!userId) {
      res.status(404).json({ success: false, message: "User Id not found" });
    }

    //find user
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found in Db" });
    }

    //find user admin or not
    if (user?.role !== "Admin") {
      res.status(404).json({
        success: false,
        message: "You can not add the product because you are not admin",
      });
    }

    //get the product info
    const { name, description, image, price, salePrice, stock, categoryId } =
      req.body;

    if (
      !name ||
      !description ||
      !image ||
      !price ||
      !salePrice ||
      !stock ||
      !categoryId
    ) {
      res.status(400).json({ success: false, message: "All info required" });
    }

    const product = new Product({
      name,
      description,
      image,
      price,
      salePrice,
      stock,
      categoryId,
    });

    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Product added", data: product });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while registering the user`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
