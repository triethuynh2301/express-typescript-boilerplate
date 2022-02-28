enum HttpStatusCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
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
    name: string = "DatabaseError"
  ) {
    super(message, statusCode, name);
  }
}

export { PageNotFoundError, ResourceNotFoundError, DatabaseError };
