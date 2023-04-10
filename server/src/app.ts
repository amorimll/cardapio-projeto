import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import categoryRoutes from "./routes/category";
import { authMiddleware } from "./middleware/auth";

export const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/product", authMiddleware, productRoutes);
app.use("/category", authMiddleware, categoryRoutes);

app.use((req, res, next) => {
  const error = new Error("Sorry, the requested resource could not be found.");
  res.status(404).json({ errorMessage: error.message });
});
