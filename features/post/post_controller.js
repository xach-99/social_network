import { sendResponse } from "../../utils/apiResponse.js";
import postService from "./post_service.js";

class PostController {
    async getUserPosts(req, res) {
        const posts = await postService.getUserPosts(req.userId);
        return sendResponse(res, {
            message: "User posts retrieved successfully",
            data: { posts }
        })
    }

    async createPost(req, res) {
        const body = {
            user_id: req.userId,
            title: req.body.title,
            description: req.body.description,
            image: req.file?.filename || null
        };

        await postService.createPost(body);

        return sendResponse(res, {
            status: 201,
            message: "Post created successfully",
        })
    }

    async getPost(req, res) {
        const post = await postService.getPostDetails(req.params.id);

        return sendResponse(res, {
            message: "Post found successfully",
            data: { post }
        })
    }

    async postLike(req, res) {
        await postService.postLike(
            req.userId,
            req.params.id
        );

        return sendResponse(res, {
            status: 200,
            message: "Post liked successfully",
        })
    }
}

export default new PostController();