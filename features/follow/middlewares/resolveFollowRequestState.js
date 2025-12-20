import { sendResponse } from "../../../utils/apiResponse.js";
import followService from "../follow_service.js";

export const resolveFollowRequestState = async (req, res, next) => {
    try {
        const request = await followService.userAlreadySentRequest(
            req.userId,
            req.targetUser.id
        );

        req.hasRequest = !!request;
        next();
    } catch (_) {
        return sendResponse(res, {
            status: 500,
            ok: false,
            message: "Server error"
        });
    }
};
