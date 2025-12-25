import authService from "../../auth/auth_service.js";

export const loadTargetUser = async (req, res, next) => {
    const targetUser = await authService.getUserById(req.params.id);

    if (!targetUser) {
        return next({
            status: 404,
            message: "User not found"
        });
    }

    if (targetUser.id === req.userId) {
        return next({
            status: 400,
            message: "You cannot follow yourself"
        });
    }

    req.targetUser = targetUser;
    next();
};
