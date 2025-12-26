import followService from "../follow_service.js";

export const checkFollowRequestExists = async (req, res, next) => {
    const request = await followService.getRequest(req.params.id);

    if (!request) {
        return next({
            status: 400,
            message: "Follow request does not exist"
        });
    }

    req.request = request;
    next();
};
