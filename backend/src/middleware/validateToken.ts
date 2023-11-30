import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import { UnauthorizedError } from "../services/errors";

async function validateToken(
  req: Request,
  _res: Response,
  next: NextFunction,
  client: Pool,
): Promise<void> {
  try {
    if (!req.headers.cookie || !req.headers.cookie.includes("token=")) {
      return next(new UnauthorizedError("Unauthorized"));
    }

    const token = req.headers.cookie.split(`token=`)[1].split(";")[0];
    if (!token) {
      return next(new UnauthorizedError("Unauthorized"));
    }
    // Vérifier le token
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const userEmailFromPayload = payload.data; // obtenir l'email du payload
    const query = `SELECT * from users WHERE users.email = $1`;

    const clientResult = await client.query(query, [userEmailFromPayload]);

    if (clientResult.rows.length === 0) {
      return next(new UnauthorizedError("Unauthorized"));
    }

    req.email = userEmailFromPayload;
    req.user_id = clientResult.rows[0].user_id;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError("Token expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError("Unauthorized"));
    } else return next(error);
  }
}

export default validateToken;
