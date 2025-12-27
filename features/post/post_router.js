import express from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { verifyAccessToken } from "../auth/middlewares/verifyToken.js";
import postController from "./post_controller.js";
import { upload } from "../../middlewares/multer.js";
import { validateBody } from "../auth/middlewares/validateBody.js";
import { createPostSchema } from "../auth/validation/index.js";

export const postRouter = express.Router();

postRouter.get(
    "/",
    asyncHandler(verifyAccessToken),
    asyncHandler(postController.getUserPosts)
);

postRouter.post(
    "/",
    asyncHandler(verifyAccessToken),
    upload.single("image"),
    validateBody(createPostSchema),
    asyncHandler(postController.createPost)
);