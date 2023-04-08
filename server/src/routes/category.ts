import express from "express";
import { createCategory, getAllCategories } from "../controllers/category";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => createCategory(req, res));
router.get("/", (req: Request, res: Response) => getAllCategories(req, res));

export default router;
