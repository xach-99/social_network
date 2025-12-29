import { sendResponse } from "../utils/apiResponse.js";

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    sendResponse(res, {
        status: err.status || 500,
        ok: false,
        message: err.message || "Server error",
        errors: err.errors || null,
    });
};
