import { Request } from 'express';

export interface TokenPayload {
  id: string;
}

export interface UserRequest extends Request {
  user?: TokenPayload;
}
