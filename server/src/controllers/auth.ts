import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../@types/controllers/IAuth";

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const payload: TokenPayload = {
      role: "admin",
    };

    const token = jwt.sign(payload, "CARDAPIOJWTPASS", {
      expiresIn: "1 day",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating login token", error);
    return res.status(500).json({ errorMessage: "Internal server error" });
  }
};
