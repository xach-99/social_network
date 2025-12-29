import followService from "../../follow/follow_service.js";

export const checkPostAccess = async (req, res, next) => {
    const { userId, postOwner } = req;
    const isUserFollowPostOwner = await followService.userAlreadyFollow(
        userId,
        postOwner.id
    );

    if (postOwner.private && !isUserFollowPostOwner && userId !== postOwner.id) {
        return next({
            status: 403,
            message: "You do not have permission to access this post"
        });
    }

    next();
};