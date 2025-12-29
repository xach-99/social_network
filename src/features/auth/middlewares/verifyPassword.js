import bcrypt from "bcrypt";
import AuthService from "../auth_service.js";

export const verifyPassword = async (req, res, next) => {
    const { password } = req.body;
    const user = await AuthService.getUserById(req.userId);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return next({
            status: 400,
            message: "Incorrect password"
        });
    }

    next()
}

