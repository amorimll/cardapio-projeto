import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  role: string;
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const payload: TokenPayload = {
      role: "admin",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
      expiresIn: "1 day",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating login token", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
