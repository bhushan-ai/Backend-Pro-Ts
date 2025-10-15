import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug?: string;
  description?: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  slug: { type: String },
  description: { type: String },
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
