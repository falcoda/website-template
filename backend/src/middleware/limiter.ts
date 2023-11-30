import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "test" ? 1000 : 100, // limit each IP to 100 requests per windowMs
  message:
    "Too many requests created from this IP, please try again after an hour",
});
