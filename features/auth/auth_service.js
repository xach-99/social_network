import { Op } from "sequelize";
import { Auth } from "../../model/index.js";

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
}

export default new AuthService();