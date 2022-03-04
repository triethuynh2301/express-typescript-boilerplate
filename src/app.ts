import express from "express";
import morgan from "morgan";
import { Sequelize } from "sequelize";
import "dotenv/config";
import AuthController from "./controllers/auth.controller";
import { IUserRepo, UserRepo } from "./models/repos/userRepo";
import User from "./models/domains/user.domain";
import {
  handlePageNotFoundError,
  returnError,
} from "./middlewares/errorhandler.middleware";

const app = express();

// use middleware
app.use(express.json());
app.use(morgan("dev"));

// controllers and repos
const userRepo = new UserRepo(new User());
const authController = new AuthController(userRepo);

// routes
app.use("/user", authController.router);

// error handling middleware
app.use(handlePageNotFoundError);
app.use(returnError);

export default app;
