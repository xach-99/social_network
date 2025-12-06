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
}

export default new AuthService();