import Post from "../model/PostModels.js";
import UserModel from "../model/UserModel.js";
import Comment from "../model/Comments.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Comments from "../model/Comments.js";

// create Post

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await UserModel.findById(req.userId);

    if (req.files) {
      let filename = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", filename));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: filename,
        author: req.userId,
      });
      await newPostWithImage.save();
      await UserModel.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      imgUrl: "",
      author: req.userId,
    });

    await newPostWithoutImage.save();
    await UserModel.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });
    return res.json(newPostWithoutImage);
  } catch (error) {
    res.json({ message: "Что то пошло не так" });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    const popularPosts = await Post.find().limit(5).sort("-views");
    if (!posts) {
      return res.json({ message: "постов нет" });
    }
    res.json({ posts, popularPosts });
  } catch (error) {
    res.json({ message: "Что то пошло не так" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndUpdate(id, {
      $inc: { views: 1 },
    });

    res.json(post);
  } catch (error) {
    res.json({ message: "Что то пошло не так" });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      })
    );
    return res.json(list);
  } catch (error) {
    res.json({ message: "Что то пошло не так" });
  }
};

export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    const deleteComment = await Post.findByIdAndUpdate(req.params.id,{
      $pull:{
        comments: req.params.id
      }
    })
    if (!post) {
      return res.json({ message: "такого поста нету" });
    }
    await Comments.deleteMany({author:req.params.author})
    await UserModel.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });
    await 
    res.json({ message: "Пост был удален" });
  } catch (error) {
    res.json({ message: "Что то пошло не так" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;

    const post = await Post.findById(id);

    if (req.files) {
      let filename = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", filename));
      post.imgUrl = filename || "";
    }

    post.title = title;
    post.text = text;
    await post.save();
    res.json(post);
  } catch (error) {
    res.json({ message: "Что то пошло не так" });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const list = await Promise.all(
      post.comments.map((comment) => {
        return Comment.findById(comment);
      })
    );
    res.json(list);
  } catch (e) {
    res.json({ message: "Что то пошло не так" });
  }
};
