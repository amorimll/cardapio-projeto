import mongoose from "mongoose";
import { ProductDocument } from "../@types/IProduct";

const ProductSchema = new mongoose.Schema(
    {
        categories: {
            type: [String],
            required: true
        },
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
            required: true
        }
    }
)

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);
export default Product