import mongoose from "mongoose";

export interface CategoryDocument extends mongoose.Document {
    id: string;
    parent: CategoryDocument | null;
    name: string;
  }