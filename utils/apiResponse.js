export const sendResponse = (res, {
    status = 200,
    ok = true,
    message = "",
    data = null,
    errors = null
}) => {
    const response = { ok, message };

    if (data) response.data = data;
    if (errors) response.errors = errors;

    return res.status(status).json(response);
};
