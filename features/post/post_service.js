import { Post, PostLike, Auth } from "../../model/index.js";

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

    getPostById(postId) {
        return Post.findByPk(postId);
    }

    getPostDetails(postId) {
        return Post.findByPk(postId, {
            include: [
                {
                    model: PostLike,
                    as: "postLikes",
                    attributes: ["id", "user_id", "createdAt"],
                    include: [
                        {
                            model: Auth,
                            as: "user",
                            attributes: [
                                "id",
                                "name",
                                "surname",
                                "username",
                                "picture_url"
                            ]
                        }
                    ]
                }
            ]
        });
    }
}

export default new PostService();