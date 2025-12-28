import { Post, PostLike } from "../../model/index.js";

class PostService {
    getUserPosts(userId) {
        return Post.findAll({
            where: {
                user_id: userId
            }
        })
    }

    postLike(userId, postId) {
        return PostLike.create({
            user_id: userId,
            post_id: postId
        });
    }
}

export default new PostService();