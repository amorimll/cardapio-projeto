import mongoose from "mongoose";
import { CategoryDocument } from "../@types/models/ICategory";

const CategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  parent: {
    type: String,
    ref: "Category",
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model<CategoryDocument>("Category", CategorySchema);
export default Category;
