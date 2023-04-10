import mongoose from "mongoose";
import { ProductDocument } from "../@types/models/IProduct";

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  categories: [
    {
      type: String,
      ref: "Category",
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);
export default Product;
