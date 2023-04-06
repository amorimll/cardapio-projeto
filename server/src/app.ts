import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import { authMiddleware } from "./middleware/auth";

export const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/product", authMiddleware, productRoutes);
