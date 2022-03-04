enum HttpStatusCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
}

class BaseError extends Error {
  message: string;
  statusCode: number;
  name: string;

  constructor(msg: string, statusCode: number, name: string) {
    super();

    this.message = msg;
    this.statusCode = statusCode;
    this.name = name;
    console.error(this.stack);
  }
}

class PageNotFoundError extends BaseError {
  constructor(
    message: string = "Routes not found",
    statusCode: number = HttpStatusCode.NOT_FOUND,
    name: string = PageNotFoundError.name
  ) {
    super(message, statusCode, name);
  }
}

class ResourceNotFoundError extends BaseError {
  constructor(
    message: string,
    statusCode: number = HttpStatusCode.NOT_FOUND,
    name: string = ResourceNotFoundError.name
  ) {
    super(message, statusCode, name);
  }
}

class DatabaseError extends BaseError {
  constructor(
    message: string,
    statusCode: number = HttpStatusCode.INTERNAL_SERVER,
    name: string = DatabaseError.name
  ) {
    super(message, statusCode, name);
  }
}

class UsernameTakenError extends DatabaseError {
  constructor(
    message: string = "Username already taken.",
    statusCode: number = HttpStatusCode.INTERNAL_SERVER,
    name: string = DatabaseError.name
  ) {
    super(message, statusCode, name);
  }
}

class UnauthorizedError extends BaseError {
  constructor(
    message: string = "Access unauthorized.",
    statusCode: number = HttpStatusCode.UNAUTHORIZED,
    name: string = UnauthorizedError.name
  ) {
    super(message, statusCode, name);
  }
}

export {
  BaseError,
  PageNotFoundError,
  ResourceNotFoundError,
  DatabaseError,
  UsernameTakenError,
  UnauthorizedError,
};
