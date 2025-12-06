import { DataTypes } from "sequelize";
import { sequelize as loader } from "../config/sequelize.js";
import AuthModel from "../features/auth/auth_model.js";

export const sequelize = loader;

export const Auth = AuthModel(sequelize, DataTypes);