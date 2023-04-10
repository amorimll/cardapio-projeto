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
router.get("/", (req: Request, res: Response) => {
  const { id } = req.query;
  if (id) {
    return getOneProduct(req, res);
  } else {
    return getAllProducts(req, res);
  }
});
router.patch("/:id", (req: Request, res: Response) => updateProduct(req, res));
router.delete("/", (req: Request, res: Response) => deleteProduct(req, res));

export default router;
