import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import {
  handlePageNotFoundError,
  returnError,
} from "./middlewares/errorhandler";

const app: Application = express();

// use middleware
app.use(express.json());
app.use(morgan("dev"));

// routes

// error handling middleware
app.use(handlePageNotFoundError);
app.use(returnError);

export default app;
