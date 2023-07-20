import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import { initialGenerateQrCode } from "../utils/sessionexists.js";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);

const init  = async () => {
    return initialGenerateQrCode()
}

init();