import express from "express";
import { verifyAccessToken } from "../auth/middlewares/verifyToken.js";
import accountController from "./account_controller.js";
import followController from "../follow/follow_controller.js";
import { loadTargetUser } from "../follow/middlewares/loadTargetUser.js";
import { resolveFollowState } from "../follow/middlewares/resolveFollowState.js";
import { resolveFollowRequestState } from "../follow/middlewares/resolveFollowRequestState.js";

export const accountRouter = express.Router();

accountRouter.get(
    "/search/:text",
    verifyAccessToken,
    accountController.search
);

accountRouter.get(
    "/:id",
    verifyAccessToken,
    accountController.getAccount
);

accountRouter.post(
    "/:id/follow",
    verifyAccessToken,
    loadTargetUser,
    resolveFollowState,
    resolveFollowRequestState,
    followController.followRequest
);