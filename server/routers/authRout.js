import { Router } from "express";
import { register, login, getMe, deleteUser, updateUser } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const userRouter = new Router();

userRouter.post("/registration", register);

userRouter.post("/login", login);

userRouter.get("/me", checkAuth, getMe);

userRouter.delete('/:username', deleteUser)

userRouter.put('/:username', updateUser)

export default userRouter;
