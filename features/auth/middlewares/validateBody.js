import { sendResponse } from "../../../utils/apiResponse.js";

export const validateBody = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    const errorsGroup = {};

    if (error) {
        error.details.forEach((err) => {
            const field = err.path[0];

            if (!errorsGroup[field]) {
                errorsGroup[field] = err.message.replace(/\"/g, '');
            }
        });

        return sendResponse(res, {
            status: 400,
            ok: false,
            message: "Validation failed",
            errors: errorsGroup,
        });
    }

    next();
};