import express from "express";
import { login } from "../controllers/auth";
import { Request, Response } from "express";

const router = express.Router();

router.post("/login", (req: Request, res: Response) => login(req, res));
export default router;