import { Post } from "../../model/index.js";

class PostService {
    getUserPosts(userId) {
        return Post.findAll({
            where: {
                user_id: userId
            }
        })
    }

    createPost(body) {
        return Post.create(body);
    }
}

export default new PostService();