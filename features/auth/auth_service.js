import bcrypt from "bcrypt";
import { Auth } from "../../model/index.js";

class AuthService {
    async createUser(data) {
        const { password } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Auth.create({
            ...data,
            password: hashedPassword,
        });
        return newUser;
    }

    async getUserById(userId) {
        const user = await Auth.findByPk(userId, {
            attributes: ["id", "name", "surname", "username", "picture_url"]
        });
        return user;
    }
}

export default new AuthService();