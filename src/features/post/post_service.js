import { Post, PostLike, Auth, PostComment } from "../../model/index.js";

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

    postLike(userId, postId) {
        return PostLike.create({
            user_id: userId,
            post_id: postId
        });
    }

    userAlreadyLiked(userId, postId) {
        return PostLike.findOne({
            where: {
                user_id: userId,
                post_id: postId
            }
        });
    }

    postComment(body) {
        return PostComment.create(body);
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
                },
                {
                    model: PostComment,
                    as: "postComments",
                    attributes: ["id", "comment", "createdAt"],
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