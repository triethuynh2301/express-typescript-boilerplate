import { Request, Response, NextFunction } from "express";
import { InvalidRequestError } from "../error";
import Joi from "joi";

export const validateSchema = (schema: Joi.ObjectSchema, options: string) => {
  return (req: Request, res: Response, nxt: NextFunction) => {
    if (options === "body") {
      const { error } = schema.validate(req.body);
      throwValidationError(error);
    } else if (options === "query") {
      const { error } = schema.validate(req.query);
      throwValidationError(error);
    } else if (options === "params") {
      const { error } = schema.validate(req.params);
      throwValidationError(error);
    }

    return nxt();
  };
};

const throwValidationError = (error: Joi.ValidationError | undefined) => {
  if (error) {
    const { details } = error;
    const message: string = details.map((i) => i.message).join(",");
    throw new InvalidRequestError(message);
  }
};
