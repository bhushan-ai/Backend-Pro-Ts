import mongoose, {  Schema } from "mongoose";

export interface ICheckout {
  user: mongoose.Schema.Types.ObjectId;
  products: {
    productId: mongoose.Schema.Types.ObjectId;
  }[];
  status: "pending" | "delivered" | "cancel" | "shipped";
  totalAmount: number;
}

const checkOutSchema = new Schema<ICheckout>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "delivered", "cancel", "shipped"],
    required: true,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
});

const Checkout = mongoose.model<ICheckout>("Checkout", checkOutSchema);

export default Checkout;
