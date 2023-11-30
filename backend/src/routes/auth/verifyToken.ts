import { Express, Request, Response } from "express";
import { Pool } from "pg";
import validateToken from "../../middleware/validateToken";

export default function verifyTokenRoute(app: Express, client: Pool): void {
  app.get(
    "/api/auth/verifyToken",
    (req: Request, res: Response, next) =>
      validateToken(req, res, next, client),
    async (_req: Request, res: Response) => {
      // Si le middleware a passé, le token est valide
      res.status(200).json({ isAuthenticated: true });
    },
  );
}
