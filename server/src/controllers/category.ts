import { Request, Response } from "express";
import Category from "../models/Category";
import { CategoryDocument } from "../@types/ICategory";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const category: CategoryDocument[] = await Category.find();
    return res.status(200).send(category);
  } catch (err: any) {
    return res.status(400).send({ Error: err.message });
  }
};
