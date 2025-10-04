import express, { Router } from "express";

import { upload } from "../../services/cloudinary";
import {
  addProduct,
  editProduct,
  handleImage,
} from "../../controllers/Admin/product.controller";
import { jwtAuth } from "../../services/jwtAuth";

const productRouter = Router();

//private routes
productRouter.post("/image-upload", upload.single("my_img"), handleImage);

productRouter.post("/add", jwtAuth, addProduct);
productRouter.post("/edit/:id", jwtAuth, editProduct);

export default productRouter;
