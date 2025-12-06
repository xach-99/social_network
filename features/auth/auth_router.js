import express from "express";
import authController from "./auth_controller.js";
import { checkUsernameUnique } from "./middlewares/signup.js";
import { signupSchema, loginSchema } from "./validation/index.js";
import { validate } from "./middlewares/validate.js";
import { checkUserExist } from "./middlewares/login.js";

export const authRouter = express.Router();

authRouter.post("/signup", [validate(signupSchema), checkUsernameUnique], authController.signup);

authRouter.post("/login", [validate(loginSchema), checkUserExist], authController.login);