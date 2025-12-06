import express from "express";
import authController from "./auth_controller.js";
import { checkUsernameUnique } from "./middlewares/signupMiddleware.js";
import { signupSchema, loginSchema } from "./validation/index.js";
import { validate } from "./middlewares/validate.js";
import { checkUserExist } from "./middlewares/loginMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

export const authRouter = express.Router();

authRouter.post("/signup", [validate(signupSchema), checkUsernameUnique], authController.signup);

authRouter.post("/login", [validate(loginSchema), checkUserExist], authController.login);

authRouter.get("/user", authMiddleware, authController.getUser);