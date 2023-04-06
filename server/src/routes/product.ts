import express from "express";
import { createProduct } from "../controllers/product";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => createProduct(req, res));

export default router;