import { Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";
import { ProductDocument } from "../@types/models/IProduct";
import { check, validationResult } from "express-validator";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: ProductDocument[] = await Product.find();

    if (products.length < 1) {
      return res.status(404).send({ errorMessage: "No products found." });
    }

    return res.status(200).send(products);
  } catch (err: any) {
    return res.status(400).send({ errorMessage: `Failed to get products, ${err.message}.` });
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    await check("id").notEmpty().isNumeric().withMessage("ID must be a number.").run(req);

    const { id } = req.query;
    const product = await Product.findOne({ id });
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errorMessage: errors.array()[0].msg });
    }

    if (!product) {
      return res.status(404).send({ errorMessage: "No product found." });
    }

    return res.status(200).send(product);
  } catch (err: any) {
    return res.status(400).send({ errorMessage: `Failed to get product, ${err.message}.`});
  }
};


export const createProduct = async (req: Request, res: Response) => {
  try {
    const { categories, name, qty, price } = req.body;
    let productCategories: string[] = [];
    const errors = validationResult(req);
    const maxId = await Product.aggregate([
      { $addFields: { idInt: { $toInt: "$id" } } },
      { $sort: { idInt: -1 } },
      { $limit: 1 },
      { $project: { maxId: "$idInt" } },
    ]);

    const id = maxId.length > 0 ? (Number(maxId[0].maxId) + 1) : 1;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errorMessage: errors.array()[0].msg });
    }

    for (let i = 0; i < categories.length; i++) {
      const category = await Category.findOne({ id: categories[i] });
      if (!category) {
        return res.status(404).send({ errorMessage: "This category does not exist." });
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

    return res.status(201).send({ responseMessage: "Product successfully created.", product });
  } catch (err: any) {
    return res.status(400).send({ errorMessage: `Failed to create product, ${err.message}.` });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    await check("id").notEmpty().isNumeric().withMessage("ID must be a number.").run(req);

    const { id } = req.params;
    const { categories, name, qty, price } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errorMessage: errors.array()[0].msg });
    }

    let productCategories: string[] = [];

    for (let i = 0; i < categories.length; i++) {
      const category = await Category.findOne({ id: categories[i] });
      if (!category) {
        return res.status(404).send({ errorMessage: "This category does not exist." });
      } else {
        productCategories.push(category.name);
      }
    }

    const updatedProduct: ProductDocument | null = await Product.findOneAndUpdate(
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
      return res.status(404).send({ errorMessage: "No product found." });
    }

    return res.status(201).send({ responseMessage: "Product successfully updated." });
  } catch (err: any) {
    return res.status(400).send({ errorMessage: `Failed to update product, ${err.message}.` });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await check("id").notEmpty().isNumeric().withMessage("ID must be a number.").run(req);

    const { id } = req.query;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errorMessage: errors.array()[0].msg });
    }

    const deletedProduct: ProductDocument | null = await Product.findOneAndDelete({ id });

    if (!deletedProduct) {
      return res.status(404).send({ errorMessage: "No product found." });
    }

    return res.status(200).send({ responseMessage: "Product successfully deleted." });
  } catch (err: any) {
    return res.status(400).send({ errorMessage: `Failed to delete product, ${err.message}.` });
  }
};
