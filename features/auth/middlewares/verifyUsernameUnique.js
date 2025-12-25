import AuthService from "../auth_service.js";

export const verifyUsernameUnique = async (req, res, next) => {
    const { username } = req.body;
    const existingUser = await AuthService.findOne({ username });

    if (existingUser) {
        return next({
            status: 400,
            message: "Validation failed",
            errors: {
                username: "Username is already registered"
            },
        });
    }

    next();
};