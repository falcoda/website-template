import { Request } from "express";

export interface CustomRequest extends Request {
  user_id: number;
  email: string;
}
