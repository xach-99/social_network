import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  surname: Joi.string().trim().min(2).required(),
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().min(6).required(),
});

export const usernameChangeSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().min(6).required(),
});

export const createPostSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().trim().min(1).required(),
});