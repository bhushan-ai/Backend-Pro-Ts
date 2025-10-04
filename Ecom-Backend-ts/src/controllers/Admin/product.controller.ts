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
      return;
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
      return;
    }

    //find user admin or not
    if (user?.role !== "Admin") {
      res.status(404).json({
        success: false,
        message: "You can not add the product because you are not admin",
      });
      return;
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
      return;
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
    console.log(`Something went wrong while adding the product`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//Edit product Controller
export const editProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //check user
    if (!req.user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
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
      return;
    }

    //find user admin or not
    if (user?.role !== "Admin") {
      res.status(404).json({
        success: false,
        message: "You can not add the product because you are not admin",
      });
      return;
    }

    //get id
    const { id: productId } = req.params;

    //check product id
    if (!productId) {
      res.status(400).json({ success: false, message: "Id not found" });
      return;
    }

    //get info
    const { name, description, image, price, salePrice, stock, categoryId } =
      req.body;

    //check info
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
      return;
    }

    //find the product
    const findTheProduct = await Product.findById(productId);
    if (!findTheProduct) {
      res.status(404).json({ success: false, message: "product not found" });
      return;
    }

    //product update
    findTheProduct.name = name || findTheProduct.name;
    findTheProduct.description = description || findTheProduct.description;
    findTheProduct.price = price === "" ? 0 : price || findTheProduct.price;
    findTheProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findTheProduct.salePrice;
    findTheProduct.image = image || findTheProduct.image;
    findTheProduct.stock = stock || findTheProduct.stock;
    findTheProduct.categoryId = categoryId || findTheProduct.categoryId;

    //save product
    await findTheProduct.save();

    res.status(201).json({
      success: true,
      message: "product detail updated",
      data: findTheProduct,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while editing the product`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};
