import { sendResponse } from "../../../utils/apiResponse.js";
import bcrypt from "bcrypt";
import AuthService from "../auth_service.js";

export const verifyUserExist = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await AuthService.findOne({ username });
        if (!user) {
            return sendResponse(res, {
                status: 401,
                ok: false,
                message: "Authentication failed",
                errors: { auth: "Invalid username or password" }
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return sendResponse(res, {
                status: 401,
                ok: false,
                message: "Authentication failed",
                errors: { auth: "Invalid username or password" }
            });
        }

        req.userId = user.id;
        next();
    } catch (_) {
        return sendResponse(res, {
            status: 500,
            ok: false,
            message: "Server error"
        });
    }
};