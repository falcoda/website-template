import { Express } from "express";

import { Pool } from "pg";
import login from "./login";
import verifyToken from "./verifyToken";

export default function (app: Express, client: Pool): void {
  verifyToken(app, client);
  login(app, client);
}
