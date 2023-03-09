import { Router } from "express";
import { deleteUser, updateUser } from "../controllers/user.js";

const userRouter = new Router();

userRouter.delete('/:username', deleteUser)

userRouter.put('/:username', updateUser)

export default userRouter;
