import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { UnauthorizedError } from "../error";

// NOTE - verify the token to make sure it has not been tempered with
// if verify succeeds -> return payload
// else -> throw error
export const authenticateToken = (
  req: Request,
  res: Response,
  nxt: NextFunction
) => {
  try {
    // NOTE
    // HTTP headers format:
    // {
    //     host: 'localhost:3000',
    //     'user-agent': 'HTTPie/1.0.3',
    //     'accept-encoding': 'gzip, deflate',
    //     accept: '*/*',
    //     connection: 'keep-alive',
    //     authorization: 'Bearer jwtToken'
    // }

    // get authorization in http header
    const authorizationString: string | undefined =
      req.headers["authorization"];
    if (authorizationString === undefined) {
      throw new UnauthorizedError("Missing token.");
    }

    // parse authorization string to get jwt token
    const bearer = authorizationString.split(" ");
    const token = bearer[1];

    // verify the token and get payload data
    const payload = jwt.verify(token, SECRET_KEY);
    
    // attach info to response (username)
    res.locals.username = payload;

    return nxt();
  } catch (e) {
    return nxt();
  }
};

export const authorizeAccess = (
  req: Request,
  res: Response,
  nxt: NextFunction
) => {
  if (!res.locals.username) {
    throw new UnauthorizedError();
  } else {
    return nxt();
  }
};
