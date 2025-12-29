import followService from "../follow_service.js";

export const checkFollowRequestExists = async (req, res, next) => {
    const request = await followService.getRequest(req.params.id);

    if (!request) {
        return next({
            status: 400,
            message: "Follow request does not exist"
        });
    }

    if (request.receiver_id !== req.userId) {
        return next({
            status: 403,
            message: "You are not allowed to manage this follow request"
        });
    }

    req.request = request;
    next();
};
