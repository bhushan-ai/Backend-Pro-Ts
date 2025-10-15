import mongoose, { Document, Schema } from "mongoose";

export interface ICheckout extends Document {
  user: mongoose.Schema.Types.ObjectId;
  products: {
    productId: mongoose.Schema.Types.ObjectId;
  }[];
  status: "pending" | "delivered" | "cancel" | "shipped";
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

//check
const checkOutSchema = new Schema<ICheckout>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "delivered", "cancel", "shipped"],
      default: "pending",
      required: true,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Checkout = mongoose.model<ICheckout>("Checkout", checkOutSchema);

export default Checkout;
