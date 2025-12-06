import express from "express";
import { sequelize } from "./model/index.js";
import { authRouter } from "./features/auth/auth_router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/auth", authRouter);


sequelize.sync().then(() => {
    console.log("DB SYNC");
});

app.listen(8080, () => console.log("http://localhost:8080"));