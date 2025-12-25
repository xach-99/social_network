export const sendResponse = (res, {
    status = 200,
    ok = true,
    message = null,
    data = null,
    errors = null
}) => {
    const response = { ok };

    if (message) response.message = message;
    if (data) response.data = data;
    if (errors) response.errors = errors;

    return res.status(status).json(response);
};
