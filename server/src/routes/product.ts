import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../controllers/product";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => createProduct(req, res));
router.get("/", (req: Request, res: Response) => getAllProducts(req, res));
router.get("/:id", (req: Request, res: Response) => getOneProduct(req, res));
router.patch("/:id", (req: Request, res: Response) => updateProduct(req, res));
router.delete("/:id", (req: Request, res: Response) => deleteProduct(req, res));

export default router;
