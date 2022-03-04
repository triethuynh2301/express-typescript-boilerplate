import express, { Request, Response, NextFunction, Router } from "express";
import bcrypt from "bcrypt";
import { validate } from "express-validation";
import jwt from "jsonwebtoken";
import { BCRYPT_WORK_FACTORY, SECRET_KEY, sequelize } from "../config";
import User from "../models/domains/user.domain";
import { IUserRepo, UserRepo } from "../models/repos/userRepo";
import UserDTO from "../models/dto/userDTO";
import UserMap from "../models/mappers/userMap";
import { createUser, loginUser } from "../schemas/schema";
import {
  DatabaseError,
  UsernameTakenError,
  ResourceNotFoundError,
} from "../error";

export default class AuthController {
  public router: Router;
  public userRepo: IUserRepo;

  // NOTE - dependency injection
  // will allow mocking for unit test of user repo
  constructor(userRepo: IUserRepo) {
    this.router = Router();
    this.userRepo = userRepo;

    this.router.post("/register", validate(createUser), this.registerUser);
    this.router.post("/login", validate(loginUser), this.login);
  }

  // SECTION - routes
  registerUser = async (req: Request, res: Response, nxt: NextFunction) => {
    try {
      const { name, username, email, password } = req.body;
      // hash user password
      const hashedPasswword: string = await bcrypt.hash(
        password,
        BCRYPT_WORK_FACTORY
      );
      // persist to db
      const newUser = await this.userRepo.createUser(
        name,
        email,
        username,
        hashedPasswword
      );
      // map to view model
      const userView: UserDTO = UserMap.toDTO(newUser);

      return res.status(201).json({ Created: userView });
    } catch (err) {
      return nxt(err);
    }
  };

  login = async (req: Request, res: Response, nxt: NextFunction) => {
    try {
      const { username, password } = req.body;
      // get user from db
      const user = await this.userRepo.findUserByUsername(username);
      // authenticate user password
      // NOTE - bcrypt.compare will throw error if password is incorrect
      if (await bcrypt.compare(password, user.password)) {
        // NOTE - create a token with jwt (payload is username)
        const token = jwt.sign({ username }, SECRET_KEY);
        return res.status(201).json({ token: token });
      }
    } catch (e) {
      return nxt(e);
    }
  };
}

// const userRepo: IUserRepo = new UserRepo(User);
// const authController = new AuthController(userRepo);
// export default AuthController;
