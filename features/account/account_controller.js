import { sendResponse } from "../../utils/apiResponse.js";
import authService from "../auth/auth_service.js";

class AccountController {
    async search(req, res) {
        try {
            const users = await authService.searchUsers(req.params.text);
            return sendResponse(res, {
                status: 200,
                ok: true,
                message: "Found Users",
                data: { users }
            })
        } catch (_) {
            return sendResponse(res, {
                status: 500,
                ok: false,
                message: "Server error"
            });
        }
    }

    async getAccount(req, res) {
        try {
            const user = await authService.getAccountById(req.params.id);
            if (!user) {
                return sendResponse(res, {
                    status: 404,
                    ok: false,
                    message: "Account not found"
                });
            }

            return sendResponse(res, {
                status: 200,
                ok: true,
                message: "Found User",
                data: { user }
            })
        } catch (_) {
            return sendResponse(res, {
                status: 500,
                ok: false,
                message: "Server error"
            });
        }
    }
}

export default new AccountController();