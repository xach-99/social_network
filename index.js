import express from "express";
import { sequelize } from "./model/index.js";
import { authRouter } from "./features/auth/auth_router.js";
import { accountRouter } from "./features/account/account_router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { followRouter } from "./features/follow/follow_router.js";
import { postRouter } from "./features/post/post_router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());


app.use("/auth", authRouter);

app.use("/account", accountRouter);

app.use("/request", followRouter);

app.use("/posts", postRouter);

app.use(errorHandler);

sequelize.sync().then(() => {
    console.log("DB SYNC");
});

app.listen(8080, () => console.log("http://localhost:8080"));