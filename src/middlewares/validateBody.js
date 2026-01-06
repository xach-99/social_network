export const validateBody = (schema) => (req, res, next) => {
    if (req.body === undefined) {
        return next({
            status: 400,
            message: "Request body is missing or invalid",
        });
    }

    const { error } = schema.validate(req.body, { abortEarly: false });
    const errorsGroup = {};

    if (error) {
        error.details.forEach((err) => {
            const field = err.path[0];

            if (!errorsGroup[field]) {
                errorsGroup[field] = err.message.replace(/\"/g, '');
            }
        });

        return next({
            status: 400,
            message: "Validation failed",
            errors: errorsGroup,
        });
    }

    next();
};