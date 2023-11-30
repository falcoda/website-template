export class ValidationError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 404) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 404) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = statusCode;
  }
}

export class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 403) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = statusCode;
  }
}
