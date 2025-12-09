import bcrypt from "bcrypt";
import { sendResponse } from "../../../utils/apiResponse.js";

export const hashPassword = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        next();
    } catch (_) {
        return sendResponse(res, {
            status: 500,
            ok: false,
            message: "Error hashing password"
        });
    }
};