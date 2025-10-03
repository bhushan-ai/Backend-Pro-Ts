import express, { Router } from "express";

import { upload } from "../../services/cloudinary";

const productRouter = Router();

productRouter.post("/image-upload", upload.single("my_img"));
