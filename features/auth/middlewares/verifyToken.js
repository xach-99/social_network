import { sendResponse } from "../../../utils/apiResponse.js";
import { verifyToken } from "../../../utils/jwt.js";

export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendResponse(res, {
            status: 401,
            ok: false,
            message: "No authorization token provided",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);

        if (!decoded?.id) {
            return sendResponse(res, {
                status: 403,
                ok: false,
                message: "Invalid token"
            });
        }

        req.userId = decoded.id;
        next();
    } catch (err) {
        return sendResponse(res, {
            status: 403,
            ok: false,
            message: "Invalid or expired token",
        });
    }
};
