import express from "express";
import { getAllCategories } from "../controllers/category";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => getAllCategories(req, res));

export default router;
