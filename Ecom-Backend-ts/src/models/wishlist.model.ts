import mongoose, { Schema } from "mongoose";

export interface IWish {
  user: mongoose.Schema.Types.ObjectId;
  products: {
    productId: mongoose.Schema.Types.ObjectId;
  }[];
  subTotal: number;
}

const wishSchema = new Schema<IWish>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
  subTotal: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Wishlist = mongoose.model<IWish>("Wishlist", wishSchema);

export default Wishlist;
