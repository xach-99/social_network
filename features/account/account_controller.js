import { sendResponse } from "../../utils/apiResponse.js";
import authService from "../auth/auth_service.js";
import follow_service from "../follow/follow_service.js";

class AccountController {
    async search(req, res) {
        const users = await authService.searchUsers(req.params.text);
        return sendResponse(res, {
            message: "Users found successfully",
            data: { users }
        })
    }

    async getAccount(req, res) {
        const user = await authService.getAccountById(req.params.id);
        if (!user) {
            throw {
                status: 404,
                message: "Account not found"
            };
        }

        return sendResponse(res, {
            message: "User retrieved successfully",
            data: { user }
        })
    }

    async getRequests(req, res) {
        const users = await follow_service.getRequests(req.userId);

        return sendResponse(res, {
            message: "User requests fetched successfully",
            data: { users }
        })
    }
}

export default new AccountController();