import AuthService from "./auth_service.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { generateToken } from "../../utils/jwt.js";

class AuthController {
    async signup(req, res) {
        await AuthService.createUser(req.body);

        sendResponse(res, {
            status: 201,
            message: "User created successfully"
        })
    }

    async login(req, res) {
        const token = generateToken({ id: req.userId });

        sendResponse(res, {
            message: "Login successful",
            data: { token },
        });
    }

    async getUser(req, res) {
        const user = await AuthService.getUserPublicById(req.userId);

        if (!user) {
            throw {
                status: 404,
                message: "User not found"
            };
        }

        return sendResponse(res, {
            message: "User retrieved successfully",
            data: { user }
        });
    }

    async changeUsername(req, res) {
        await AuthService.changeUserWhere(
            req.userId,
            { username: req.body.username }
        );

        return sendResponse(res, {
            status: 201,
            message: "Username changed successfully"
        });
    }

    async changePrivacy(req, res) {
        const user = await AuthService.getUserPublicById(req.userId);
        await AuthService.changeUserWhere(
            req.userId,
            { privacy: !user.privacy }
        );

        return sendResponse(res, {
            message: "Privacy changed successfully",
            data: { privacy: !user.privacy }
        });
    }
}

export default new AuthController();