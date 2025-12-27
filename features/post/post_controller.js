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
}

export default new PostController();