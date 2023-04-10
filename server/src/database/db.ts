import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL ?? "");
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export const disconnect = async () => {
  try {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error: any) {
    console.error("Error disconnecting from MongoDB:", error.message);
    process.exit(1);
  }
};
