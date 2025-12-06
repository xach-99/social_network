import { Auth } from "../../../model/index.js";
import { sendResponse } from "../../../utils/apiResponse.js";

export const checkUsernameUnique = async (req, res, next) => {
    const { username } = req.body;

    try {
        const existingUser = await Auth.findOne({ where: { username } });
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
    } catch (err) {
        console.error(err);
        return sendResponse(res, {
            status: 500,
            ok: false,
            message: "Server error"
        });
    }
};