import { DataTypes } from "sequelize";
import { sequelize as loader } from "../config/sequelize.js";
import AuthModel from "../features/auth/auth_model.js";
import followModel from "../features/follow/models/follow_model.js";
import followRequestModel from "../features/follow/models/follow_request_model.js";
import postModel from "../features/post/models/post_model.js";
import postLikeModel from "../features/post/models/post_like_model.js";

export const sequelize = loader;

export const Auth = AuthModel(sequelize, DataTypes);
export const Follow = followModel(sequelize, DataTypes);
export const FollowRequest = followRequestModel(sequelize, DataTypes);
export const Post = postModel(sequelize, DataTypes);
export const PostLike = postLikeModel(sequelize, DataTypes);

Auth.hasMany(Follow, { foreignKey: "following_id", as: "followers" });
Follow.belongsTo(Auth, { foreignKey: "following_id", as: "following" });

Auth.hasMany(Follow, { foreignKey: "follower_id", as: "followings" });
Follow.belongsTo(Auth, { foreignKey: "follower_id", as: "follower" });

Auth.hasMany(FollowRequest, { foreignKey: "sender_id", as: "sentFollowRequests" });
FollowRequest.belongsTo(Auth, { foreignKey: "sender_id", as: "sender" });

Auth.hasMany(FollowRequest, { foreignKey: "receiver_id", as: "receivedFollowRequests" });
FollowRequest.belongsTo(Auth, { foreignKey: "receiver_id", as: "receiver" });

Auth.hasMany(Post, { foreignKey: "user_id", as: "posts" });
Post.belongsTo(Auth, { foreignKey: "user_id", as: "user" });

Post.hasMany(PostLike, { foreignKey: "post_id", as: "postLikes" });
PostLike.belongsTo(Post, { foreignKey: "post_id", as: "post" });

Auth.hasMany(PostLike, { foreignKey: "user_id", as: "postLikes" });
PostLike.belongsTo(Auth, { foreignKey: "user_id", as: "user" });