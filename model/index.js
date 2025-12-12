import { DataTypes } from "sequelize";
import { sequelize as loader } from "../config/sequelize.js";
import AuthModel from "../features/auth/auth_model.js";
import followModel from "../features/follow/follow_model.js";

export const sequelize = loader;

export const Auth = AuthModel(sequelize, DataTypes);
export const Follow = followModel(sequelize, DataTypes);

Auth.hasMany(Follow, { foreignKey: "following_id", as: "followers" });
Follow.belongsTo(Auth, { foreignKey: "following_id", as: "following" });

Auth.hasMany(Follow, { foreignKey: "follower_id", as: "followings" });
Follow.belongsTo(Auth, { foreignKey: "follower_id", as: "follower" });