import express, { Router } from "express";

import { jwtAuth } from "../../services/jwtAuth";
import { addToWishlist } from "../../controllers/user/user.wishlist.controller";

const wishlistProducts = Router();

wishlistProducts.post("/add", jwtAuth, addToWishlist);

export default wishlistProducts;
