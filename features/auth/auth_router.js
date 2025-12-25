import express from "express";
import authController from "./auth_controller.js";
import followController from "../follow/follow_controller.js";
import postController from "../post/post_controller.js";
import { signupSchema, loginSchema, usernameChangeSchema } from "./validation/index.js";
import { verifyUsernameUnique } from "./middlewares/verifyUsernameUnique.js";
import { validateBody } from "./middlewares/validateBody.js";
import { verifyUserExist } from "./middlewares/verifyUserExist.js";
import { verifyAccessToken } from "./middlewares/verifyToken.js";
import { verifyPassword } from "./middlewares/verifyPassword.js";
import { hashPassword } from "./middlewares/hashPassword.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const authRouter = express.Router();

authRouter.post(
    "/signup",
    validateBody(signupSchema),
    asyncHandler(verifyUsernameUnique),
    asyncHandler(hashPassword),
    asyncHandler(authController.signup)
);

authRouter.post(
    "/login",
    validateBody(loginSchema),
    asyncHandler(verifyUserExist),
    asyncHandler(authController.login)
);

authRouter.get(
    "/user",
    asyncHandler(verifyAccessToken),
    asyncHandler(authController.getUser)
);

authRouter.patch(
    "/user/username",
    asyncHandler(verifyAccessToken),
    validateBody(usernameChangeSchema),
    asyncHandler(verifyPassword),
    asyncHandler(verifyUsernameUnique),
    asyncHandler(authController.changeUsername)
);

authRouter.patch(
    "/user/privacy",
    asyncHandler(verifyAccessToken),
    asyncHandler(authController.changePrivacy)
);

authRouter.get(
    "/user/followers",
    asyncHandler(verifyAccessToken),
    asyncHandler(followController.getFollowers)
);

authRouter.get(
    "/user/followings",
    asyncHandler(verifyAccessToken),
    asyncHandler(followController.getFollowings)
);

authRouter.get(
    "/user/posts",
    asyncHandler(verifyAccessToken),
    asyncHandler(postController.getUserPosts)
);