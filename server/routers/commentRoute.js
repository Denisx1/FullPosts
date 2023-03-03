import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createComment, deletComment } from "../controllers/comments.js";

const commentRouter = new Router();

commentRouter.post("/:id", checkAuth, createComment);

commentRouter.delete('/:id/:comentId', deletComment)

export default commentRouter;
