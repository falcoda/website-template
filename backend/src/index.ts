// Importing environment variables
import dotenv from "dotenv";
dotenv.config();

// Importing necessary modules
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";

import helmet from "helmet";
import path from "path";
import { Pool } from "pg";

// Importing routes
import auth from "./routes/auth/index";
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./services/errors";

const expressStaticGzip = require("express-static-gzip");

// Creating the express app
const app: Express = express();

// database connection
const db = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: parseInt(process.env.DATABASE_PORTDB || "5432"),
});

// Connecting to the database
db.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack);
    return console.log("error");
  }
  if (!client) {
    console.error("Error acquiring client");
    return console.log("error");
  }
  console.log("Successful database connection");
  client.query("SELECT NOW()", (err) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });
});

// CSP setup
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "trusted-cdn.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      objectSrc: ["'self'"],
    },
  }),
);

// CORS setup
const corsOptions = {
  origin: "http://localhost",
};
app.use(cors(corsOptions));

// Using body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Using helmet middleware
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "trusted-cdn.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      objectSrc: ["'self'", "blob:"],
      frameSrc: ["'self'", "blob:"],
    },
  }),
);

// Routes for backend

auth(app, db);

if (process.env.NODE_ENV !== "test") {
  app.set("trust proxy", true);
}

app.use((req: Request, res: Response, next: Function) => {
  expressStaticGzip(path.join(__dirname, "build"), {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: (res: Response) => {
      res.setHeader("Cache-Control", "public, max-age=31536000");
    },
  })(req, res, next);
});

// to get the frontend routes
app.get("*", (_req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Gestionnaire de middleware pour les routes non trouvées
app.use((_req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({ error: "Route not found" });
});

// Gestionnaire d'erreurs global
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(403).json({ message: err.message });
  }

  console.error(err);

  res.status(500).json({ message: "Internal server error" });
  return;
});

declare module "express-serve-static-core" {
  interface Request {
    user_id: number;
    email: string;
  }
}

export { app };
// Setting the port for the backend server
if (process.env.NODE_ENV !== "test") {
  const PORT: number = 4001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}
