import { sendResponse } from "../../../utils/apiResponse.js";
import authService from "../../auth/auth_service.js";

export const loadTargetUser = async (req, res, next) => {
    try {
        const targetUser = await authService.getUserById(req.params.id);

        if (!targetUser) {
            return sendResponse(res, {
                status: 404,
                ok: false,
                message: "User not found"
            });
        }

        if (targetUser.id === req.userId) {
            return sendResponse(res, {
                status: 400,
                ok: false,
                message: "You cannot follow yourself"
            });
        }

        req.targetUser = targetUser;
        next();
    } catch (_) {
        return sendResponse(res, {
            status: 500,
            ok: false,
            message: "Server error"
        });
    }
};
