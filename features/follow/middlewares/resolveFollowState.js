import { sendResponse } from "../../../utils/apiResponse.js";
import followService from "../follow_service.js";

export const resolveFollowState = async (req, res, next) => {
    try {
        const follow = await followService.userAlreadyFollow(
            req.userId,
            req.targetUser.id
        );

        req.isFollowing = !!follow;
        next();
    } catch (_) {
        return sendResponse(res, {
            status: 500,
            ok: false,
            message: "Server error"
        });
    }
};
