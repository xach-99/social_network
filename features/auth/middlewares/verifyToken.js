import { verifyToken } from "../../../utils/jwt.js";

export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next({
            status: 401,
            message: "No authorization token provided",
        });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    req.userId = decoded.id;
    next();
};
