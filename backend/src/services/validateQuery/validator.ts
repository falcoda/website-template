import { Request } from "express";
import { Pool } from "pg";
import { ValidationError } from "../errors";

export async function validateUserId(
  client: Pool,
  user_id: number,
): Promise<boolean> {
  const userResult = await client.query(
    "SELECT * FROM users WHERE user_id = $1",
    [user_id],
  );

  if (userResult.rows.length === 0) {
    throw new ValidationError(`User with ID ${user_id} not found`);
  }

  return Promise.resolve(true);
}

export async function validateRequestParams(
  client: Pool,
  req: Request,
  requiredParams: string[],
): Promise<boolean> {
  for (const param of requiredParams) {
    if (
      req.body[param] === "" ||
      req.body[param] === undefined ||
      req.body[param] === null
    ) {
      throw new ValidationError(`Missing required parameter: ${param}`);
    }
  }

  if (requiredParams.includes("user_id")) {
    await validateUserId(client, req.body.user_id);
  }

  if (requiredParams.includes("email")) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(req.body.email)) {
      throw new ValidationError("Email is not valid");
    }
  }

  return Promise.resolve(true);
}
