import postService from "../post_service.js";

export const checkPostNotLiked = async (req, res, next) => {
    const postLiked = await postService.userAlreadyLiked(
        req.userId,
        req.params.id
    );

    if (postLiked) {
        return next({
            status: 409,
            message: "Post already liked",
        });
    }

    next();
};