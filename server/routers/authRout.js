import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const authRouter = new Router();

authRouter.post("/registration", register);

authRouter.post("/login", login);

authRouter.get("/me", checkAuth, getMe);

export default authRouter;
