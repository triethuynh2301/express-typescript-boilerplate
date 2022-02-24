enum HttpStatusCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

class BaseError extends Error {
  message: string;
  statusCode: number;

  constructor(msg: string, statusCode: number) {
    super();

    this.message = msg.toUpperCase();
    this.statusCode = statusCode;
    // console.error(this.stack);
  }
}

class PageNotFoundError extends BaseError {
  constructor(
    message: string = "Page not found",
    statusCode: number = HttpStatusCode.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

class ResourceNotFoundError extends BaseError {
  constructor(message: string, statusCode: number = HttpStatusCode.NOT_FOUND) {
    super(message, statusCode);
  }
}

class InvalidRequestError extends BaseError {
  constructor(
    message: string,
    statusCode: number = HttpStatusCode.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

export { PageNotFoundError, InvalidRequestError, ResourceNotFoundError };
