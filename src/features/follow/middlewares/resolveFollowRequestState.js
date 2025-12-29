import followService from "../follow_service.js";

export const resolveFollowRequestState = async (req, res, next) => {
    const request = await followService.userAlreadySentRequest(
        req.userId,
        req.targetUser.id
    );

    req.hasRequest = !!request;
    next();
};
