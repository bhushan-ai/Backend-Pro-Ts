import { NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface ICart extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }[];
  subTotal: number;
}

const cartSchema = new Schema<ICart>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  subTotal: {
    type: Number,
    default: 0,
    required: true,
  },
});

cartSchema.pre("save", async function (next) {
  let total = 0;
  for (const item of this.items) {
    const product = await mongoose.model("Product").findById(item.productId);
    if (product) total += product.price * item.quantity;
  }
  this.subTotal = total;
  next();
});

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
