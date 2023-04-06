import express from "express";
import { createProduct, getAllProducts } from "../controllers/product";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => createProduct(req, res));
router.get("/", (req: Request, res: Response) => getAllProducts(req, res));

export default router;