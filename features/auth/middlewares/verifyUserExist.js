import bcrypt from "bcrypt";
import AuthService from "../auth_service.js";

export const verifyUserExist = async (req, res, next) => {
    const { username, password } = req.body;
    
    const user = await AuthService.findOne({ username });
    if (!user) {
        return next({
            status: 401,
            message: "Authentication failed",
            errors: { auth: "Invalid username or password" }
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next({
            status: 401,
            message: "Authentication failed",
            errors: { auth: "Invalid username or password" }
        })
    }

    req.userId = user.id;
    next();
};