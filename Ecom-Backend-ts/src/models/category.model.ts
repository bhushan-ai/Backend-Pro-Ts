import mongoose, { Schema } from "mongoose";

export interface ICategory {
  name: string;
  slug?: string;
  description?: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String },
  description: { type: String },
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
