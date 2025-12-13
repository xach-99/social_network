import { Post } from "../../model/index.js";

class PostService {
    getUserPosts(userId) {
        return Post.findAll({
            where: {
                user_id: userId
            }
        })
    }
}

export default new PostService();