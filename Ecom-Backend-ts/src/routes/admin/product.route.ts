import express, { Router } from "express";

import { upload } from "../../services/cloudinary";
import { handleImage } from "../../controllers/Admin/product.controller";

const productRouter = Router();

productRouter.post("/image-upload", upload.single("my_img"), handleImage);
