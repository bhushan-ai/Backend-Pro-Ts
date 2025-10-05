import mongoose, { Schema } from "mongoose";

export interface ICart {
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

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
