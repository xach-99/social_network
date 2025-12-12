import express from "express";
import { verifyAccessToken } from "../auth/middlewares/verifyToken.js";
import accountController from "./account_controller.js";

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