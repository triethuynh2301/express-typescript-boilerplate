import User from "../domains/user.domain";
import { DatabaseError, ResourceNotFoundError } from "../../error";

export interface IUserRepo {
  createUser(
    name: string,
    email: string,
    username: string,
    password: string
  ): Promise<User>;
  findUserByUsername(username: string): Promise<User>;
}

export class UserRepo implements IUserRepo {
  private model: any;

  // can implement dependency injection
  constructor(model: any) {
    this.model = model;
  }

  public async createUser(
    name: string,
    email: string,
    username: string,
    password: string
  ): Promise<User> {
    const newUser = await User.create({
      name: name,
      email: email,
      username: username,
      password: password,
    }).catch((e) => {
      throw new DatabaseError(e);
    });

    return newUser;
  }

  public async findUserByUsername(username: string): Promise<User> {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    // user not found -> throw error
    if (!user) {
      throw new ResourceNotFoundError("User not found.");
    }

    return user;
  }
}
