import { Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";
import { ProductDocument } from "../@types/IProduct";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { id, categories, name, qty, price } = req.body;

    let productCategories: any = [];

    for (let i = 0; i < categories.length; i++) {
      const category = await Category.findOne({ id: categories[i] });
      if (category) {
        productCategories.push(category._id);
      }
    }

    const product: ProductDocument = new Product({
      id,
      categories: productCategories,
      name,
      qty,
      price,
    });

    const productSave = await product.save();

    return res.status(201).send(productSave);
  } catch (err: any) {
    return res.status(400).send({ Error: err.message });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: ProductDocument[] = await Product.find();
    return res.status(200).send(products);
  } catch (err: any) {
    return res.status(400).send({ Error: err.message });
  }
};
