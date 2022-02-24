import express, { Application, Request, Response, NextFunction } from "express";
import {
  PageNotFoundError,
  InvalidRequestError,
  ResourceNotFoundError,
} from "./error";
import morgan from "morgan";

const app: Application = express();

// use middleware
app.use(express.json());
app.use(morgan("dev"));

// error handling
app.use((req, res, next) => {
  const err = new PageNotFoundError();
  return next(err);
});

app.use((err: Error, req: Request, res: Response, nxt: NextFunction) => {
  console.error(err);

  if (err instanceof InvalidRequestError) {
    return res.status(400).json({
      error: {
        status: err.statusCode,
        message: err.message,
      },
    });
  } else if (err instanceof PageNotFoundError) {
    return res.status(err.statusCode).json({
      error: {
        status: err.statusCode,
        message: err.message,
      },
    });
  } else if (err instanceof ResourceNotFoundError) {
    return res.status(err.statusCode).json({
      error: {
        status: err.statusCode,
        message: err.message,
      },
    });
  }

  return res.status(res.statusCode || 500).json({
    error: {
      status: 500,
      message: "Internal Server Error",
    },
  });
});

export default app;
