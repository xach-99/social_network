import postService from "../post_service.js";

export const checkPostExist = async (req, res, next) => {
    const post = await postService.getPostById(req.params.id);

    if(!post){
        return next({
            status: 404,
            message: "Post not found"
        });
    }

    req.post = post;
    next();
};