import { Router } from "express";
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
  removePost,
  updatePost,
  getPostComments
} from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const postRouter = new Router();

postRouter.post("/", checkAuth, createPost);

postRouter.get("/", getAll);

postRouter.get("/:id", getById);

postRouter.get("/user/me", checkAuth, getMyPosts);

postRouter.delete("/:id/:author", checkAuth, removePost);

postRouter.put("/:id", checkAuth, updatePost);

postRouter.get("/comments/:id", getPostComments);

export default postRouter;
