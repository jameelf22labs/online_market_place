import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors";

const globalErrorMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(err.message);
  console.log(err.stack);

  if (err instanceof NotFoundError) {
    return response.status(err.statusCode).json({
      status: false,
      message: "Object keys are missing",
      error: err.message,
    });
  }

  if (err instanceof BadRequestError) {
    return response.status(err.statusCode).json({
      status: false,
      message: "Bad Request",
      error: err.message,
    });
  }

  if (err instanceof UnAuthorizedError) {
    return response.status(err.statusCode).json({
      status: false,
      message: "Un Authorized Request",
      error: err.message,
    });
  }

  return response.status(400).json({
    status: false,
    message: "Internal Server Error",
    error: {},
  });
};

export default globalErrorMiddleware;
