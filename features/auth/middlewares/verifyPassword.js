import bcrypt from "bcrypt";
import AuthService from "../auth_service.js";
import { sendResponse } from "../../../utils/apiResponse.js";


export const verifyPassword = async (req, res, next) => {
    const { password } = req.body;
    try {
        const user = await AuthService.getUserById(req.userId);
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return sendResponse(res, {
                status: 400,
                ok: false,
                message: "Incorrect password"
            })
        }

        next()
    }
    catch (_) {
        return sendResponse(res, {
            status: 500,
            ok: false,
            message: "Server error"
        });
    }
}