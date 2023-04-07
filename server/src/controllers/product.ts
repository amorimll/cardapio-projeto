import { Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";
import { ProductDocument } from "../@types/IProduct";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: ProductDocument[] = await Product.find();

    if (products.length < 1) {
      return res.status(200).send({ Error: "No products found" });
    }

    return res.status(200).send(products);
  } catch (err: any) {
    return res.status(400).send({ Error: err.message });
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ id });

    if (!product) {
      return res.status(200).send({ Error: "No product found" });
    }

    return res.status(200).send(product);
  } catch (err: any) {
    return res.status(400).send({ Error: err.message });
  }
};

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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { categories, name, qty, price } = req.body;

    let productCategories: any = [];

    for (let i = 0; i < categories.length; i++) {
      const category = await Category.findOne({ id: categories[i] });
      if (category) {
        productCategories.push(category._id);
      }
    }

    const updatedProduct: ProductDocument | null =
      await Product.findOneAndUpdate(
        { id },
        {
          categories: productCategories,
          name,
          qty,
          price,
        },
        { new: true }
      );

    if (!updatedProduct) {
      return res.status(404).send({ Error: "Product not found" });
    }

    return res.status(200).send(updatedProduct);
  } catch (err: any) {
    return res.status(400).send({ Error: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProduct: ProductDocument | null =
      await Product.findOneAndDelete({ id });

    if (!deletedProduct) {
      return res.status(404).send({ Error: "Product not found" });
    }

    return res.status(200).send({ message: "Product successfully deleted" });
  } catch (err: any) {
    return res.status(400).send({ Error: err.message });
  }
};
