import { Sequelize } from "sequelize";
import { ENV } from "./env.js";

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = ENV;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: "mysql",
    logging: false
});