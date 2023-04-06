import mongoose from "mongoose";
import { CategoryDocument } from "./ICategory";

export interface ProductDocument extends mongoose.Document {
    categories: CategoryDocument[];
    name: string;
    qty: number;
    price: number;
  }
