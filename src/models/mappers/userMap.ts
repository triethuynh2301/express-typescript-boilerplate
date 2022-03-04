import User from "../domains/user.domain";
import UserDTO from "../dto/userDTO";

export default class UserMap {
  static toDTO = (user: User): UserDTO => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
    };
  };
}
