import { sendResponse } from "../../../utils/apiResponse.js";
import AuthService from "../auth_service.js";

export const verifyUsernameUnique = async (req, res, next) => {
    const { username } = req.body;

    try {
        const existingUser = await AuthService.findOne({ username });
        if (existingUser) {
            return sendResponse(res, {
                status: 400,
                ok: false,
                message: "Validation failed",
                errors: {
                    username: "Username is already registered"
                },
            });
        }

        next();
    } catch (_) {
        return sendResponse(res, {
            status: 500,
            ok: false,
            message: "Server error"
        });
    }
};