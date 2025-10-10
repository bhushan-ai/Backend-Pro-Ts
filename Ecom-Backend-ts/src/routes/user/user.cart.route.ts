import express, { Router } from "express";

import { jwtAuth } from "../../services/jwtAuth";
import { addToCart, fetchItemsOfCart } from "../../controllers/user/user.cart.controller";


const cartRouter = Router();

cartRouter.post("/add", jwtAuth, addToCart);
cartRouter.post("/remove", jwtAuth, fetchItemsOfCart);

export default cartRouter;
