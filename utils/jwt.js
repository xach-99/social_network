import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const { SECRET_KEY, EXPIRES_IN } = ENV;

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: EXPIRES_IN,
  });
};