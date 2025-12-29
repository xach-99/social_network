import express from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { verifyAccessToken } from "../../middlewares/verifyAccessToken.js";
import postController from "./post_controller.js";
import { upload } from "../../middlewares/multer.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { createPostSchema } from "../../validation/index.js";
import { checkPostAccess } from "./middlewares/checkPostAccess.js"
import { checkPostExist } from "./middlewares/checkPostExist.js";
import { checkPostOwner } from "./middlewares/checkPostOwner.js";
import { checkPostNotLiked } from "./middlewares/checkPostNotLiked.js";

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

postRouter.get(
    "/:id",
    asyncHandler(verifyAccessToken),
    asyncHandler(checkPostExist),
    asyncHandler(checkPostOwner),
    asyncHandler(checkPostAccess),
    asyncHandler(postController.getPost)
);

postRouter.post(
    "/:id/like",
    asyncHandler(verifyAccessToken),
    asyncHandler(checkPostExist),
    asyncHandler(checkPostOwner),
    asyncHandler(checkPostAccess),
    asyncHandler(checkPostNotLiked),
    asyncHandler(postController.postLike)
);

postRouter.post(
    "/:id/comment",
    asyncHandler(verifyAccessToken),
    asyncHandler(checkPostExist),
    asyncHandler(checkPostOwner),
    asyncHandler(checkPostAccess),
    asyncHandler(postController.postComment)
);