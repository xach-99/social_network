import { Op } from "sequelize";
import { Auth, Post, Follow } from "../../model/index.js";

class AuthService {
    createUser(data) {
        return Auth.create(data);
    }

    getUserById(userId) {
        return Auth.findByPk(userId);
    }

    getUserPublicById(userId) {
        return Auth.findByPk(userId, {
            attributes: { exclude: ["password"] }
        });
    }

    findOne(obj) {
        return Auth.findOne({ where: obj });
    }

    changeUserWhere(userId, obj) {
        return Auth.update(obj, { where: { id: userId } });
    }

    searchUsers(searchText) {
        return Auth.findAll({
            where: {
                username: {
                    [Op.like]: `${searchText}%`
                }
            },
            attributes: [
                "name",
                "surname",
                "username",
                "picture_url"
            ]
        })
    }

    async getAccountById(accountId) {
        const user = await Auth.findByPk(accountId, {
            attributes: [
                "name",
                "surname",
                "username",
                "picture_url"
            ]
        });

        const postCount = await Post.count({ where: { user_id: accountId } });
        const followersCount = await Follow.count({ where: { following_id: accountId } });
        const followingsCount = await Follow.count({ where: { follower_id: accountId } });

        return {
            ...user.toJSON(),
            postCount,
            followersCount,
            followingsCount
        }
    }
}

export default new AuthService();