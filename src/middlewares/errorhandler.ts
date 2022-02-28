import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validation";
import {
  PageNotFoundError,
  ResourceNotFoundError,
  DatabaseError,
} from "../error";

/**
 * This method will be called when the request does not
 * match any router before it. It will instantiate PageNotFoundError
 * object and forward to the returnError method
 */
export const handlePageNotFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new PageNotFoundError();
  return next(err);
};

/**
 * Handle any errors thrown from the app.
 * In case an error is thrown with no type, it
 * will return a generic error type
 */
export const returnError = (
  err: Error,
  req: Request,
  res: Response,
  nxt: NextFunction
) => {
  if (err instanceof PageNotFoundError) {
    return res.status(err.statusCode).json({
      error: {
        name: err.name,
        status: err.statusCode,
        message: err.message,
      },
    });
  } else if (err instanceof ResourceNotFoundError) {
    return res.status(err.statusCode).json({
      error: {
        name: err.name,
        status: err.statusCode,
        message: err.message,
      },
    });
  } else if (err instanceof DatabaseError) {
    return res.status(err.statusCode).json({
      error: {
        name: err.name,
        status: err.statusCode,
        message: err.message,
      },
    });
  } else if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json({
    error: {
      status: 500,
      message: "Internal Server Error",
      name: "UnknowError",
    },
  });
};
