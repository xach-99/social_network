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
}

export default new PostController();