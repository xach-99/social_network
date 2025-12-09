import AuthService from "./auth_service.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { generateToken } from "../../utils/jwt.js";

class AuthController {
    async signup(req, res) {
        try {
            await AuthService.createUser(req.body);

            sendResponse(res, {
                status: 201,
                ok: true,
                message: "User created successfully"
            })
        } catch (_) {
            sendResponse(res, {
                status: 500,
                ok: false,
                message: "Server error"
            })
        }
    }

    async login(req, res) {
        try {
            const token = generateToken({ id: req.userId });
            sendResponse(res, {
                status: 200,
                ok: true,
                message: "Login successful",
                data: { token }
            })
        } catch (_) {
            sendResponse(res, {
                status: 500,
                ok: false,
                message: "Server error"
            })
        }
    }

    async getUser(req, res) {
        try {
            const user = await AuthService.getUserPublicById(req.userId);

            if (!user) {
                return sendResponse(res, {
                    status: 404,
                    ok: false,
                    message: "User not found"
                });
            }

            return sendResponse(res, {
                status: 200,
                ok: true,
                data: { user }
            });
        } catch (_) {
            return sendResponse(res, {
                status: 500,
                ok: false,
                message: "Server error",
            });
        }
    }

    async changeUsername(req, res) {
        try {
            await AuthService.changeUserWhere(req.userId, { username: req.body.username });
            return sendResponse(res, {
                status: 201,
                ok: true,
                message: "Username changed successfull"
            });
        } catch (_) {
            return sendResponse(res, {
                status: 500,
                ok: false,
                message: "Server error"
            });
        }
    }

    async changePrivacy(req, res) {
        try {
            const user = await AuthService.getUserPublicById(req.userId);
            await AuthService.changeUserWhere(req.userId, { privacy: !user.privacy });

            return sendResponse(res, {
                status: 200,
                ok: true,
                message: "Privacy changed successfull",
                data: { privacy: !user.privacy }
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