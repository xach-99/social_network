import followService from "../follow_service.js";

export const resolveFollowState = async (req, res, next) => {
    const follow = await followService.userAlreadyFollow(
        req.userId,
        req.targetUser.id
    );

    req.isFollowing = !!follow;
    next();
};
