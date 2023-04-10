import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import dotenv from "dotenv";
import { TokenPayload, UserRequest } from '../@types/middleware/IAuth';

dotenv.config()

export const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ errorMessage: 'Authorization denied. Token is required.' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET ?? "") as TokenPayload;

    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ errorMessage: 'Authorization denied. Token is invalid.' });
  }
};
