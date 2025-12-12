import express from "express";
import authController from "./auth_controller.js";
import followController from "../follow/follow_controller.js";
import { verifyUsernameUnique } from "./middlewares/verifyUsernameUnique.js";
import { signupSchema, loginSchema, usernameChangeSchema } from "./validation/index.js";
import { validateBody } from "./middlewares/validateBody.js";
import { verifyUserExist } from "./middlewares/verifyUserExist.js";
import { verifyAccessToken } from "./middlewares/verifyToken.js";
import { verifyPassword } from "./middlewares/verifyPassword.js";
import { hashPassword } from "./middlewares/hashPassword.js";

export const authRouter = express.Router();

authRouter.post(
    "/signup",
    validateBody(signupSchema),
    verifyUsernameUnique,
    hashPassword,
    authController.signup
);

authRouter.post(
    "/login",
    validateBody(loginSchema),
    verifyUserExist,
    authController.login
);

authRouter.get(
    "/user",
    verifyAccessToken,
    authController.getUser
);

authRouter.patch(
    "/user/username",
    verifyAccessToken,
    validateBody(usernameChangeSchema),
    verifyPassword,
    verifyUsernameUnique,
    authController.changeUsername
);

authRouter.patch(
    "/user/privacy",
    verifyAccessToken,
    authController.changePrivacy
);

authRouter.get(
    "/user/followers",
    verifyAccessToken,
    followController.getFollowers
);

authRouter.get(
    "/user/followings",
    verifyAccessToken,
    followController.getFollowings
);