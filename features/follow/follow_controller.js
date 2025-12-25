import { sendResponse } from "../../utils/apiResponse.js";
import followService from "./follow_service.js";

class AuthController {
    async getFollowers(req, res) {
        const users = await followService.getUserFollowers(req.userId);
        return sendResponse(res, {
            message: "Followers retrieved successfully",
            data: { users }
        });
    }

    async getFollowings(req, res) {
        const users = await followService.getUserFollowings(req.userId);
        return sendResponse(res, {
            message: "Followings retrieved successfully",
            data: { users }
        });
    }

    async followRequest(req, res) {
        const { targetUser, userId, isFollowing, hasRequest } = req;
        const { privacy, id } = targetUser;

        if (isFollowing) {
            await followService.unfollowUser(req.userId, id);
            return sendResponse(res, {
                message: "User unfollowed successfully",
                data: { user: targetUser }
            });
        }
        if (privacy) {
            if (hasRequest) {
                await followService.cancelFollowRequest(userId, id);
                return sendResponse(res, {
                    message: "Follow request canceled successfully",
                    data: { user: targetUser }
                });
            }

            await followService.sendFollowRequest(userId, id);
            return sendResponse(res, {
                message: "Follow request sent successfully",
                data: { user: targetUser }
            });
        }

        await followService.followUser(userId, id);
        return sendResponse(res, {
            message: "User followed successfully",
            data: { user: targetUser }
        });
    }
}

export default new AuthController();