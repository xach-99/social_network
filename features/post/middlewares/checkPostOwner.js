import authService from "../../auth/auth_service.js";

export const checkPostOwner = async (req, res, next) => {
    const postOwner = await authService.getUserPublicById(req.post.user_id);

    if (!postOwner) {
      return next({
        status: 404,
        message: "Post owner not found",
      });
    }

    req.postOwner = postOwner;
    next();
};