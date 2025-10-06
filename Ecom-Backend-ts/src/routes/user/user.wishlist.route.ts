import express, { Router } from "express";

import { jwtAuth } from "../../services/jwtAuth";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../controllers/user/user.wishlist.controller";

const wishlistProducts = Router();

wishlistProducts.post("/add", jwtAuth, addToWishlist);
wishlistProducts.post("/remove", jwtAuth, removeFromWishlist);

export default wishlistProducts;
