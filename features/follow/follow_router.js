import express from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { verifyAccessToken } from "../auth/middlewares/verifyToken.js";
import followController from "./follow_controller.js";
import { checkFollowRequestExists } from "./middlewares/checkFollowRequestExists.js";

export const followRouter = express.Router();

followRouter.patch(
    "/:id/accept",
    asyncHandler(verifyAccessToken),
    asyncHandler(checkFollowRequestExists),
    asyncHandler(followController.acceptFollowRequest)
);