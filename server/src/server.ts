import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3001;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL ?? "")
  .then(() => {
    app.listen(PORT, () => console.log(`Server started at ${PORT}.`));
  })
  .catch((error) => console.log(`${error}`));
