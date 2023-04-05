import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface UserRequest extends Request {
  user: any;
}

export const verifyToken = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(403).json({errorMessage: "Acesso Negado, token necessário."});
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET ?? "");
    req.user = verified;
    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
