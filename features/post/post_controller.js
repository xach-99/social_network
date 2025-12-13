import { sendResponse } from "../../utils/apiResponse.js";
import postService from "./post_service.js";

class PostController {
    async getUserPosts(req, res) {
        try {
            const posts = await postService.getUserPosts(req.userId);
            return sendResponse(res, {
                status: 200,
                ok: true,
                message: "Found posts",
                data: { posts }
            })
        } catch (_) {
            return sendResponse(res, {
                status: 500,
                ok: false,
                message: "Server error"
            });
        }
    }
}

export default new PostController();