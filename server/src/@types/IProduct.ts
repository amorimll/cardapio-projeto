import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
    categories: string;
    name: string;
    qty: number;
    price: number;
  }
  