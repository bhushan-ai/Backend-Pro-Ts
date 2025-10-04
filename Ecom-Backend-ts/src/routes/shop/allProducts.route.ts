import express, { Router } from "express";
import { getAllProducts } from "../../controllers/shop/publicProducts.controller";
import { jwtAuth } from "../../services/jwtAuth";

const shopProducts = Router();

shopProducts.get("/all", jwtAuth, getAllProducts);

export default shopProducts;
