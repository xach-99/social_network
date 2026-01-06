import express from "express";
import { sequelize } from "./src/model/index.js";
import { authRouter } from "./src/features/auth/auth_router.js";
import { accountRouter } from "./src/features/account/account_router.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { followRouter } from "./src/features/follow/follow_router.js";
import { postRouter } from "./src/features/post/post_router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/request", followRouter);
app.use("/posts", postRouter);

app.use(errorHandler);

sequelize.sync().then(() => {
    console.log("DB SYNC");
});

app.listen(8080, () => console.log("http://localhost:8080"));