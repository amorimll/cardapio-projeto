import { Request, Response } from "express";
import Category from "../models/Category";
import { CategoryDocument } from "../@types/models/ICategory";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const category: CategoryDocument[] = await Category.find();

    if (category.length < 1) {
      return res.status(404).send({ errorMessage: "No categories found" });
    }

    return res.status(200).send(category);
  } catch (err: any) {
    return res.status(400).send({ errorMessage: `Failed to get categories, ${err.message}` });
  }
};
