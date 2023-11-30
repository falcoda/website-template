import argon2 from "argon2";
import dayjs from "dayjs";
import { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import { limiter } from "../../middleware/limiter";
import { validateRequestParams } from "../../services/validateQuery/validator";

export default function (app: Express, client: Pool): void {
  app.use("/api/auth/login", limiter);

  // Route for login
  app.post(
    "/api/auth/login",
    async (request: Request, response: Response, next) => {
      const { email, password } = request.body;

      const requiredParams = ["email", "password"];

      try {
        await validateRequestParams(client, request, requiredParams);

        const res = await client.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);

        if (res.rows.length !== 1) {
          response.status(401).json({ message: "User not found!" });
          return;
        }

        const user = res.rows[0];

        // check if user have an organization

        const valid = await argon2.verify(user.password, password);

        if (!valid) {
          response.status(401).json({ message: "Invalid password!" });
          return;
        }

        const token = jwt.sign({ data: email }, process.env.JWT_KEY as string, {
          expiresIn: "24h",
        });

        response.cookie(`token`, token, {
          secure: true,
          expires: dayjs().add(1, "days").toDate(),
        });
        if (!user.organization_id) {
          response
            .status(201)
            .json({ message: "You don't have an organization" });
          return;
        }
        response.status(201).json({ message: "Login successfully!" });
      } catch (error) {
        next(error);
      }
    },
  );
}
