import express from "express";
import { verifyAccessToken } from "../auth/middlewares/verifyToken.js";
import accountController from "./account_controller.js";
import followController from "../follow/follow_controller.js";
import { loadTargetUser } from "../follow/middlewares/loadTargetUser.js";
import { resolveFollowState } from "../follow/middlewares/resolveFollowState.js";
import { resolveFollowRequestState } from "../follow/middlewares/resolveFollowRequestState.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const accountRouter = express.Router();

accountRouter.get(
    "/search/:text",
    asyncHandler(verifyAccessToken),
    asyncHandler(accountController.search)
);

accountRouter.get(
    "/requests",
    asyncHandler(verifyAccessToken),
    asyncHandler(accountController.getRequests)
);

accountRouter.get(
    "/:id",
    asyncHandler(verifyAccessToken),
    asyncHandler(accountController.getAccount)
);

accountRouter.post(
    "/:id/follow",
    asyncHandler(verifyAccessToken),
    asyncHandler(loadTargetUser),
    asyncHandler(resolveFollowState),
    asyncHandler(resolveFollowRequestState),
    asyncHandler(followController.followRequest)
);