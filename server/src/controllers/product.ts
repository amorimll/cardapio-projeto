import { Request, Response } from "express";
import Product from "../models/Product";
import { ProductDocument } from "../@types/IProduct";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product: ProductDocument = new Product({
      categories: ['teste 1', 'teste 2'],
      name: "Olá Mundo",
      qty: 42,
      price: 42
    });
    const productSave = await product.save();

    return res.status(201).send(productSave);
  } catch (err: any) {
    return res.status(400).send({ Error: err.message });
  }
};