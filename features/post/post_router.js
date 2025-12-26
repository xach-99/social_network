import express from"express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { verifyAccessToken } from "../auth/middlewares/verifyToken.js";
import postController from "./post_controller.js";

export const postRouter = express.Router();

postRouter.get(
    "/", 
    asyncHandler(verifyAccessToken),
    asyncHandler(postController.getUserPosts)
);