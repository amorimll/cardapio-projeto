import { Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";
import { ProductDocument } from "../@types/IProduct";
import { check, validationResult } from "express-validator";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: ProductDocument[] = await Product.find();

    if (products.length < 1) {
      return res.status(404).send({ Error: "No products found" });
    }

    return res.status(200).send(products);
  } catch (err: any) {
    return res.status(400).send({ Error: `Failed to get products, ${err.message}` });
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    await check("id").notEmpty().isNumeric().withMessage("ID must be number").run(req);

    const errors = validationResult(req);
    const { id } = req.params;
    const product = await Product.findOne({ id });

    if (!errors.isEmpty()) {
      return res.status(400).send({ Error: errors.array()[0].msg });
    }

    if (!product) {
      return res.status(404).send({ Error: "No product found" });
    }

    return res.status(200).send(product);
  } catch (err: any) {
    return res.status(400).send({ Error: `Failed to get product, ${err.message}`});
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    const { id, categories, name, qty, price } = req.body;
    let productCategories: any = [];

    if (!errors.isEmpty()) {
      return res.status(400).json({ Error: errors.array()[0].msg });
    }

    for (let i = 0; i < categories.length; i++) {
      const category = await Category.findOne({ id: categories[i] });
      if (!category) {
        return res.status(404).send({ Error: "This category does not exist." });
      } else {
        productCategories.push(category.name);
      }
    }

    const product: ProductDocument = new Product({
      id,
      categories: productCategories,
      name,
      qty,
      price,
    });

    await product.save();

    return res.status(200).send({ Message: "Product successfully created." });
  } catch (err: any) {
    return res.status(400).send({ Error: `Failed to create product, ${err.message}.` });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    await check("id").notEmpty().isNumeric().withMessage("ID must be number").run(req);

    const { id } = req.params;
    const { categories, name, qty, price } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ Error: errors.array()[0].msg });
    }

    let productCategories: any = [];

    for (let i = 0; i < categories.length; i++) {
      const category = await Category.findOne({ id: categories[i] });
      if (!category) {
        return res.status(404).send({ Error: "This category does not exist." });
      } else {
        productCategories.push(category.name);
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
      return res.status(404).send({ Error: "No product found" });
    }

    return res.status(200).send({ Message: "Product successfully updated." });
  } catch (err: any) {
    return res.status(400).send({ Error: `Failed to update product, ${err.message}` });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await check("id").notEmpty().isNumeric().withMessage("ID must be number").run(req);

    const errors = validationResult(req);
    const { id } = req.params;

    if (!errors.isEmpty()) {
      return res.status(400).send({ Error: errors.array()[0].msg });
    }

    const deletedProduct: ProductDocument | null =
      await Product.findOneAndDelete({ id });

    if (!deletedProduct) {
      return res.status(404).send({ Error: "No product found" });
    }

    return res.status(200).send({ Message: "Product successfully deleted." });
  } catch (err: any) {
    return res.status(400).send({ Error: `Failed to delete product, ${err.message}.` });
  }
};
