import { sendResponse } from "../../utils/apiResponse.js";
import followService from "./follow_service.js";

class AuthController {
    async getFollowers(req, res) {
        try {
            const users = await followService.getUserFollowers(req.userId);
            return sendResponse(res, {
                status: 200,
                ok: true,
                message: "Found followers",
                data: { users }
            });
        } catch (_) {
            return sendResponse(res, {
                status: 500,
                ok: false,
                message: "Server error"
            });
        }
    }

    async getFollowings(req, res) {
        try {
            const users = await followService.getUserFollowings(req.userId);
            return sendResponse(res, {
                status: 200,
                ok: true,
                message: "Found followings",
                data: { users }
            });
        } catch (_) {
            return sendResponse(res, {
                status: 500,
                ok: false,
                message: "Server error"
            });
        }
    }

    async followRequest(req, res) {
        const { targetUser, userId, isFollowing, hasRequest } = req;
        const { privacy, id } = targetUser;

        try {
            if (isFollowing) {
                await followService.unfollowUser(req.userId, id);
                return sendResponse(res, {
                    status: 200,
                    ok: true,
                    message: "Unfollow User",
                    data: { user: targetUser }
                });
            }
            else if (privacy) {
                if (hasRequest) {
                    await followService.cancelFollowRequest(userId, id);
                    return sendResponse(res, {
                        status: 200,
                        ok: true,
                        message: "Cancel Follow Request",
                        data: { user: targetUser }
                    });
                }

                await followService.sendFollowRequest(userId, id);
                return sendResponse(res, {
                    status: 200,
                    ok: true,
                    message: "Sent Follow Request",
                    data: { user: targetUser }
                });
            }

            await followService.followUser(userId, id);
            return sendResponse(res, {
                status: 200,
                ok: true,
                message: "Follow User",
                data: { user: targetUser }
            });
        } catch (_) {
            return sendResponse(res, {
                status: 500,
                ok: false,
                message: "Server error"
            });
        }
    }
}

export default new AuthController();