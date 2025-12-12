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
}

export default new AuthController();