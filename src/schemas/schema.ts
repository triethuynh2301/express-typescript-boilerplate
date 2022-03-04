import Joi from "joi";

export const createUser = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().max(20).required(),
    password: Joi.string().min(6).max(20).required(),
  }),
};

export const loginUser = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
